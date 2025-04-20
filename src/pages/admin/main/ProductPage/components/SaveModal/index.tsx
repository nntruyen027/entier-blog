import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { EditorField } from '~/components';
import FileUploader from '../FileUploader';
import { getProductTypesStart } from '~/redux/productType/slice';
import { RootState } from '~/redux/store';

import 'react-quill/dist/quill.snow.css';

interface ProductType {
  id: string | number;
  name: string;
  description?: string;
  createAt?: string;
  updatedAt?: string;
}

interface SaveModalProps {
  isModalOpen: boolean;
  onCancel: () => void;
  form: any;
  onSave: (values: any) => void;
  editingProduct: any;
}

const SaveModal = ({ isModalOpen, onCancel, form, onSave, editingProduct }: SaveModalProps) => {
  const dispatch = useDispatch();
  const isEditing = !!editingProduct;

  const [editorReady, setEditorReady] = useState(false);

  const { productTypes } = useSelector((state: RootState) => state.productType);

  // Fetch product types and tags
  useEffect(() => {
    if (isModalOpen) {
      dispatch(getProductTypesStart({}));
      const timer = setTimeout(() => setEditorReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      setEditorReady(false);
    }
  }, [isModalOpen]);

  // Set form values when editing
  useEffect(() => {
    if (isEditing && editingProduct) {
      form.setFieldsValue({
        name: editingProduct.name,
        type: editingProduct?.type?.id,
        description: editingProduct.description,
        file: editingProduct.file,
        image: editingProduct.image,
        content: editingProduct.content,
        isPublic: editingProduct.isPublic,
        price: editingProduct.price
      });
    }
  }, [isEditing, editingProduct, form]);

  const productTypeOptions = productTypes.map((type: ProductType) => ({
    label: type.name,
    value: type.id
  }));

  const handleSave = (values: any) => {
    const finalValues = {
      ...values,
      type: values.type,
      file: values.file,
      image: values.image
    };
    onSave(finalValues);
  };

  return (
    <Modal
      title={isEditing ? 'Cập nhật thông tin sản phẩm' : 'Thêm sản phẩm mới'}
      open={isModalOpen}
      centered
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Cập nhật' : 'Tạo'}
      cancelText='Hủy'
      width={'80%'}
    >
      <Form form={form} layout='vertical' onFinish={handleSave}>
        <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
          <Input placeholder='VD: Quản lý kho...' autoFocus />
        </Form.Item>
        <Form.Item label='Mô tả' name='description'>
          <Input placeholder='VD: Mô tả ngắn gọn' autoFocus multiple />
        </Form.Item>
        <div className='flex gap-6 w-full'>
          <Form.Item
            label='Loại sản phẩm'
            name='type'
            rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
            className={'w-full'}
          >
            <Select
              showSearch
              placeholder='Chọn loại sản phẩm'
              options={productTypeOptions}
              onChange={(value) => form.setFieldsValue({ type: value })}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            />
          </Form.Item>
          <Form.Item
            label='Giá tiền (VND)'
            name='price'
            rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
            className={'w-full'}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder='Nhập giá sản phẩm'
              min={0}
              formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
            />
          </Form.Item>
        </div>

        <div className='flex gap-6'>
          <Form.Item label='Tệp đính kèm' name='file' valuePropName='value' getValueFromEvent={(e) => e}>
            <FileUploader form={form} fieldName='file' fileType='any' />
          </Form.Item>

          <Form.Item label='Hình ảnh' name='image' valuePropName='value' getValueFromEvent={(e) => e}>
            <FileUploader form={form} fieldName='image' fileType='image' />
          </Form.Item>
        </div>

        {editorReady && (
          <Form.Item
            key={editingProduct?.id || 'new'}
            label='Nội dung'
            name='content'
            rules={[{ required: true, message: 'Vui lòng nhập nội dung sản phẩm!' }]}
          >
            <EditorField />
          </Form.Item>
        )}

        <Form.Item className='mt-20' name='isPublic' valuePropName='checked'>
          <Switch checkedChildren='Công khai' unCheckedChildren='Cá nhân' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveModal;
