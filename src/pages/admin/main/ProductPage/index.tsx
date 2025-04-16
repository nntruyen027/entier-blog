import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import {
  createProductStart,
  deleteProductStart,
  getProductsByAdminStart,
  updateProductStart
} from '~/redux/product/slice';
import { ColumnsType } from 'antd/es/table';
import { SaveModal } from './components';
import { Button, Form, Input, Popconfirm, Space, Tag } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { truncate } from '~/utils/string';

const Page = () => {
  const dispatch = useDispatch();
  const { products, pageCount, rowCount, loading } = useSelector((state: RootState) => state.product);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getProductsByAdminStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: any) => {
    const preservedFields = editingProduct
      ? {
          viewCount: editingProduct.view,
          createdAt: editingProduct.createdAt
        }
      : {};

    const fullProductData = { ...preservedFields, ...values };

    if (editingProduct) {
      dispatch(updateProductStart({ id: editingProduct.id, body: { ...editingProduct, ...values } }));
    } else {
      dispatch(createProductStart(fullProductData));
    }

    form.resetFields();
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProductStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingProduct(null);
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
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (description: string) => <span>{truncate(description)}</span>
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      width: 100,
      render: (price: number) => price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
      align: 'center',
      width: 100,
      render: (count: number) => (
        <span>
          <EyeOutlined className='text-green-500 mr-1' />
          {count}
        </span>
      )
    },

    {
      title: 'Trạng thái',
      dataIndex: 'isPublic',
      key: 'isPublic',
      align: 'center',
      width: 100,
      render: (isPublic: boolean) => (isPublic ? <Tag color='green'>Công khai</Tag> : <Tag color='orange'>Cá nhân</Tag>)
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
            title='Bạn có chắc muốn xóa sản phẩm này?'
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
        editingProduct={editingProduct}
      />
      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Tìm theo tên bài viết...'
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
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm sản phẩm
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={products}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
