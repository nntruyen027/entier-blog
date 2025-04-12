import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import {
  assignRoleToUserStart,
  createUserStart,
  deleteUserStart,
  getUsersStart,
  updateUserStart
} from '~/redux/user/slice'; // ⚠️ bạn cần có action này
import { ColumnsType } from 'antd/es/table';
import { AssignRolesModal, SaveModal } from './components';
import { Avatar, Button, Form, Input, Popconfirm, Space } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const Page = () => {
  const dispatch = useDispatch();
  const { users, pageCount, rowCount, loading } = useSelector((state: RootState) => state.user);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [selectedUsername, setSelectedUsername] = useState<number | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getUsersStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: any) => {
    const avatar = form.getFieldValue('avatar');
    const finalValues = { ...values, avatar: avatar || '' };

    if (editingUser) {
      dispatch(updateUserStart({ id: editingUser.id, user: finalValues }));
    } else {
      dispatch(createUserStart(finalValues));
    }
    form.resetFields();
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUserStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleAssignRoles = (user: any) => {
    setSelectedUsername(user.username);
    setSelectedRoles(user.roles || []);
    setOpenAssignModal(true);
  };

  const handleSubmitAssign = (roles: string[]) => {
    if (selectedUsername !== null) {
      dispatch(assignRoleToUserStart({ username: selectedUsername, roles }));
    }
    setOpenAssignModal(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'index',
      align: 'center',
      width: 70,
      render: (_, __, index) => pagination.pageIndex * pagination.pageSize + index + 1
    },
    {
      title: 'Họ tên',
      key: 'fullName',
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} icon={!record.avatar && <UserOutlined />} />
          {record.fullName}
        </Space>
      )
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 100
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 100
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button type='link' onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title='Bạn có chắc muốn xóa người dùng này?'
            okText='Xóa'
            cancelText='Hủy'
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type='link' danger>
              Xoá
            </Button>
          </Popconfirm>
          <Button type='link' onClick={() => handleAssignRoles(record)}>
            Phân quyền
          </Button>
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
        editingUser={editingUser}
      />

      <AssignRolesModal
        open={openAssignModal}
        onClose={() => setOpenAssignModal(false)}
        onSubmit={handleSubmitAssign}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
      />

      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Tìm theo tên hoặc email...'
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
            setEditingUser(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm người dùng
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={users}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
