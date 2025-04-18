import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { createParamStart, deleteParamStart, getParamsStart, updateParamStart } from '~/redux/param/slice';
import { ColumnsType } from 'antd/es/table';
import { SaveModal } from './components';
import { Button, Form, Input, Popconfirm, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { JsonEditor } from 'json-edit-react';

const Page = () => {
  const dispatch = useDispatch();
  const { params, pageCount, rowCount, loading } = useSelector((state: RootState) => state.param);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParam, setEditingParam] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getParamsStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: { key: string; dataType: string; value: any }) => {
    if (editingParam) {
      dispatch(updateParamStart({ _id: editingParam._id, body: { ...values } }));
    } else {
      dispatch(createParamStart(values));
    }

    form.resetFields();
    setEditingParam(null);
    setIsModalOpen(false);
  };

  const handleEdit = (param: any) => {
    setEditingParam(param);
    form.setFieldsValue(param);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteParamStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingParam(null);
    setIsModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'index',
      align: 'center',
      width: 100,
      render: (_, __, index: number) => pagination.pageIndex * pagination.pageSize + index + 1
    },
    {
      title: 'Khóa',
      dataIndex: 'key',
      key: 'key',
      width: 250
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 200
    },
    {
      title: 'Giá trị',
      key: 'value',
      dataIndex: 'value',
      render: (value, record) => {
        if (record.dataType === 'boolean') {
          return <Tag color={value ? 'green' : 'red'}>{value ? 'True' : 'False'}</Tag>;
        }
        if (record.dataType === 'json') {
          let jsonData;
          try {
            jsonData = typeof value === 'object' ? value : JSON.parse(value);
          } catch {
            jsonData = {};
          }
          return (
            <div style={{ maxWidth: 300, overflow: 'auto' }}>
              <JsonEditor data={jsonData} viewOnly />
            </div>
          );
        }
        return value?.toString();
      }
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
            onConfirm={() => handleDelete(record._id)}
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
        editingParam={editingParam}
      />

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
            setEditingParam(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm thẻ
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={params}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
