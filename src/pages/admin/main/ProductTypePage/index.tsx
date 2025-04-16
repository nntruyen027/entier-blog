import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import {
  createProductTypeStart,
  deleteProductTypeStart,
  getProductTypesStart,
  updateProductTypeStart
} from '~/redux/productType/slice';
import { ColumnsType } from 'antd/es/table';
import { SaveModal } from './components';
import { Button, Form, Input, Popconfirm, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { truncate } from '~/utils/string';

const Page = () => {
  const dispatch = useDispatch();
  const { productTypes, pageCount, rowCount, loading } = useSelector((state: RootState) => state.productType);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductType, setEditingProductType] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getProductTypesStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: any) => {
    const preservedFields = editingProductType
      ? {
          viewCount: editingProductType.view,
          createdAt: editingProductType.createdAt
        }
      : {};

    const fullProductTypeData = { ...preservedFields, ...values };

    if (editingProductType) {
      dispatch(updateProductTypeStart({ id: editingProductType.id, body: { ...editingProductType, ...values } }));
    } else {
      dispatch(createProductTypeStart(fullProductTypeData));
    }

    form.resetFields();
    setEditingProductType(null);
    setIsModalOpen(false);
  };

  const handleEdit = (productType: any) => {
    setEditingProductType(productType);
    form.setFieldsValue(productType);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProductTypeStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingProductType(null);
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
      title: 'Tên loại sản phẩm',
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
      title: 'Hành động',
      width: 150,
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='link' onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title='Bạn có chắc muốn xóa loại sản phẩm này?'
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
        editingProductType={editingProductType}
      />
      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Tìm theo tên loại sản phẩm...'
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
            setEditingProductType(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm loại sản phẩm
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={productTypes}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
