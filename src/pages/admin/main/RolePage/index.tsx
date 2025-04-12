import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { createRoleStart, deleteRoleStart, getRolesStart, updateRoleStart } from '~/redux/role/slice';
import { ColumnsType } from 'antd/es/table';
import { SaveModal } from './components';
import { Button, Form, Input, Popconfirm, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Page = () => {
  const dispatch = useDispatch();
  const { roles, pageCount, rowCount, loading } = useSelector((state: RootState) => state.role);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getRolesStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: any) => {
    if (editingRole) {
      dispatch(updateRoleStart({ id: editingRole.id, body: { ...values } }));
    } else {
      dispatch(createRoleStart(values));
    }

    form.resetFields();
    setEditingRole(null);
    setIsModalOpen(false);
  };

  const handleEdit = (role: any) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteRoleStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingRole(null);
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
      title: 'Tên quyền',
      dataIndex: 'roleName',
      key: 'roleName',
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
            title='Bạn có chắc muốn xóa quyền này?'
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
        editingRole={editingRole}
      />

      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Tìm theo tên quyền...'
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
            setEditingRole(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm quyền
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={roles}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
