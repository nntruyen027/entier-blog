import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { deleteContactStart, getContactsStart } from '~/redux/contact/slice';
import { ColumnsType } from 'antd/es/table';
import { Button, Input, Popconfirm, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ContactDetailModal from '~/pages/admin/main/ContactPage/components/ContactDetail';

const Page = () => {
  const dispatch = useDispatch();
  const { contacts, pageCount, rowCount, loading } = useSelector((state: RootState) => state.contact);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getContactsStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleDelete = (id: number) => {
    dispatch(deleteContactStart(id));
  };
  const onViewDetail = (record: any) => {
    setSelectedContact(record);
    setOpenModal(true);
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
      title: 'Tên liên hệ',
      dataIndex: 'author',
      key: 'author',
      width: 250
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Loại liên hệ',
      dataIndex: 'type',
      key: 'type',
      render: (value) => value.name
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Hành động',
      width: 150,
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='link' onClick={() => onViewDetail(record)}>
            Xem
          </Button>
          <Popconfirm
            title='Bạn có chắc muốn xóa liên hệ này?'
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
    <>
      <ContactDetailModal open={openModal} onClose={() => setOpenModal(false)} contact={selectedContact} />
      <div>
        <div className='flex justify-between mb-4'>
          <Input
            placeholder='Tìm theo tên tên...'
            prefix={<SearchOutlined />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            allowClear
            className='max-w-sm'
          />
        </div>

        <Table
          isLoading={loading}
          columns={columns}
          data={contacts}
          setPagination={setPagination}
          pagination={pagination}
          rowCount={rowCount}
          pageCount={pageCount}
        />
      </div>
    </>
  );
};

export default Page;
