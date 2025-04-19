import { Modal, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { getTagsStart } from '~/redux/tag/slice';

const Page = ({ open, onClose, onSubmit, selectedRoles, setSelectedRoles }) => {
  const dispatch = useDispatch();
  const { tags, loading, pageCount } = useSelector((state: RootState) => state.tag);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

  useEffect(() => {
    dispatch(
      getTagsStart({
        page: pagination.pageIndex,
        size: pagination.pageSize,
        keyword: searchKeyword
      })
    );
  }, [pagination.pageIndex, searchKeyword]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && pagination.pageIndex + 1 < pageCount) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    }
  };

  return (
    <Modal title='Gắn thẻ' open={open} onCancel={onClose} onOk={() => onSubmit(selectedRoles)}>
      <Select
        mode='multiple'
        showSearch
        allowClear
        placeholder='Chọn các thẻ...'
        value={selectedRoles.map((r) => r.id)}
        onChange={(roleNames) => {
          const selected = tags.filter((r) => roleNames.includes(r.id));
          setSelectedRoles(selected);
        }}
        style={{ width: '100%' }}
        onSearch={(val) => {
          setSearchKeyword(val);
          setPagination({ pageIndex: 0, pageSize: 20 });
        }}
        notFoundContent={loading ? <Spin size='small' /> : 'Không có thẻ nào'}
        filterOption={false}
        onPopupScroll={handleScroll}
        options={tags.map((r) => ({ label: r.name, value: r.id }))}
      />
    </Modal>
  );
};

export default Page;
