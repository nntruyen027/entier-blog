import { Modal, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { getRolesStart } from '~/redux/role/slice';

const Page = ({ open, onClose, onSubmit, selectedRoles, setSelectedRoles }) => {
  const dispatch = useDispatch();
  const { roles, loading, pageCount } = useSelector((state: RootState) => state.role);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

  useEffect(() => {
    dispatch(
      getRolesStart({
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
    <Modal title='Phân quyền người dùng' open={open} onCancel={onClose} onOk={() => onSubmit(selectedRoles)}>
      <Select
        mode='multiple'
        showSearch
        allowClear
        placeholder='Chọn các vai trò...'
        value={selectedRoles.map((r) => r.roleName)}
        onChange={(roleNames) => {
          const selected = roles.filter((r) => roleNames.includes(r.roleName));
          setSelectedRoles(selected);
        }}
        style={{ width: '100%' }}
        onSearch={(val) => {
          setSearchKeyword(val);
          setPagination({ pageIndex: 0, pageSize: 20 });
        }}
        notFoundContent={loading ? <Spin size='small' /> : 'Không có vai trò nào'}
        filterOption={false}
        onPopupScroll={handleScroll}
        options={roles.map((r) => ({ label: r.roleName, value: r.roleName }))}
      />
    </Modal>
  );
};

export default Page;
