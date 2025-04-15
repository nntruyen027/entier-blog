import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { deleteContactStart, getContactsStart } from '~/redux/contact/slice';
import { ColumnsType } from 'antd/es/table';
import { Button, Form, Input, Popconfirm, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Page = () => {
  const dispatch = useDispatch();
  const { contacts, pageCount, rowCount, loading } = useSelector((state: RootState) => state.contact);

  const [form] = Form.useForm();
  const [searchKeyword, setSearchKeyword] = useState('');

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

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'index',
      align: 'center',
      width: 100,
      render: (_: any, __: any, index: number) => pagination.pageIndex * pagination.pageSize + index + 1
    },
    {
      title: 'Tên thẻ',
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
  );
};

export default Page;
