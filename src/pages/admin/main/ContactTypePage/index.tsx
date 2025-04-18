import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import {
  createContactTypeStart,
  deleteContactTypeStart,
  getContactTypesStart,
  updateContactTypeStart
} from '~/redux/contactType/slice';
import { ColumnsType } from 'antd/es/table';
import { SaveModal } from './components';
import { Button, Form, Input, Popconfirm, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Page = () => {
  const dispatch = useDispatch();
  const { contactTypes, pageCount, rowCount, loading } = useSelector((state: RootState) => state.contactType);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactType, setEditingContactType] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getContactTypesStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: any) => {
    if (editingContactType) {
      dispatch(updateContactTypeStart({ id: editingContactType.id, body: { ...values } }));
    } else {
      dispatch(createContactTypeStart(values));
    }

    form.resetFields();
    setEditingContactType(null);
    setIsModalOpen(false);
  };

  const handleEdit = (contactType: any) => {
    setEditingContactType(contactType);
    form.setFieldsValue(contactType);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteContactTypeStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingContactType(null);
    setIsModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'index',
      align: 'center',
      width: 100,
      render: (_: any, __: any, index: number) => pagination.pageIndex * pagination.pageSize + index + 1
    },
    {
      title: 'Tên loại liên hệ',
      dataIndex: 'name',
      key: 'name',
      width: 250
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
            title='Bạn có chắc muốn xóa loại liên hệ này?'
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
      <SaveModal
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        form={form}
        onSave={handleSave}
        editingContactType={editingContactType}
      />

      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Tìm theo tên loại liên hệ...'
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
            form.setFieldsValue({ color: '#000000' });
            setEditingContactType(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm loại liên hệ
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={contactTypes}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
