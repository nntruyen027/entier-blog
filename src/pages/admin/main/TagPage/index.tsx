import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { createTagStart, deleteTagStart, getTagsStart, updateTagStart } from '~/redux/tag/slice';
import { ColumnsType } from 'antd/es/table';
import { SaveModal } from './components';
import { Button, Form, Input, Popconfirm, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Page = () => {
  const dispatch = useDispatch();
  const { tags, pageCount, rowCount, loading } = useSelector((state: RootState) => state.tag);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getTagsStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: any) => {
    if (editingTag) {
      dispatch(updateTagStart({ id: editingTag.id, body: { ...values } }));
    } else {
      dispatch(createTagStart(values));
    }

    form.resetFields();
    setEditingTag(null);
    setIsModalOpen(false);
  };

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    form.setFieldsValue(tag);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTagStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingTag(null);
    setIsModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'index',
      align: 'center',
      width: 50,
      render: (_: any, __: any, index: number) => pagination.pageIndex * pagination.pageSize + index + 1
    },
    {
      title: 'Tên thẻ',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Hành động',
      width: 150,
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='link' onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title='Bạn có chắc muốn xóa thẻ này?'
            okText='Xóa'
            cancelText='Hủy'
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type='link' danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <SaveModal isModalOpen={isModalOpen} onCancel={handleCancel} form={form} onSave={handleSave} />

      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Tìm theo tên thẻ...'
          prefix={<SearchOutlined />}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          allowClear
          className='max-w-sm'
        />
        <Button
          type='primary'
          onClick={() => {
            form.resetFields();
            setEditingTag(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm thẻ
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={tags}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
