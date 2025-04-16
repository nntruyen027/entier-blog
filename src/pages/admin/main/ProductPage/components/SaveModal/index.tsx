import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { EditorField } from '~/components';
import FileUploader from '../FileUploader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { getProductTypesStart } from '~/redux/productType/slice';

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

// @ts-ignore
// @ts-ignore
const SaveModal = ({ isModalOpen, onCancel, form, onSave, editingProduct }: SaveModalProps) => {
  const isEditing = !!editingProduct;
  const [editorReady, setEditorReady] = useState(false);
  const { productTypes } = useSelector((state: RootState) => state.productType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) {
      dispatch(getProductTypesStart({}));
      const timer = setTimeout(() => {
        setEditorReady(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setEditorReady(false);
    }
  }, [isModalOpen]); // Fetch lại dữ liệu khi từ khóa hoặc trang thay đổi

  useEffect(() => {
    if (isEditing && editingProduct) {
      form.setFieldsValue({
        name: editingProduct.name,
        type: editingProduct?.type?.id, // Chỉ set id của loại sản phẩm
        description: editingProduct.description,
        file: editingProduct.file,
        content: editingProduct.content,
        isPublic: editingProduct.isPublic,
        price: editingProduct.price // Set giá tiền nếu có
      });
    }
  }, [isEditing, editingProduct, form]);

  const productTypeOptions = productTypes.map((type: ProductType) => ({
    label: type.name,
    value: type.id // Lấy chỉ id của loại sản phẩm
  }));

  const handleSave = (values: any) => {
    const finalValues = {
      ...values,
      type: values.type // Lưu lại id của loại sản phẩm
    };

    onSave(finalValues); // Gọi onSave và chỉ truyền id của type
  };

  return (
    <Modal
      title={isEditing ? 'Cập nhật thông tin bài viết' : 'Thêm bài viết mới'}
      open={isModalOpen}
      centered
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Cập nhật' : 'Tạo'}
      cancelText='Hủy'
      width={800}
    >
      <Form form={form} layout='vertical' onFinish={handleSave}>
        <Form.Item label='Tên sản phẩm' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
          <Input placeholder='VD: Quản lý kho...' autoFocus />
        </Form.Item>

        <Form.Item
          label='Loại sản phẩm'
          name='type'
          rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
        >
          <Select
            showSearch
            placeholder='Chọn loại sản phẩm'
            options={productTypeOptions}
            value={isEditing ? editingProduct?.type?.id : undefined} // Lấy id khi chỉnh sửa
            onChange={(value) => form.setFieldsValue({ type: value })} // Chỉ set id khi thay đổi
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Mô tả ngắn gọn nội dung sản phẩm...' rows={3} />
        </Form.Item>

        <Form.Item label='Tệp đính kèm' name='file' valuePropName='value' getValueFromEvent={(e) => e}>
          <FileUploader form={form} />
        </Form.Item>

        <Form.Item label='Giá tiền (VND)' name='price' rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
          <InputNumber
            style={{ width: '100%' }}
            placeholder='Nhập giá sản phẩm'
            min={0}
            formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
          />
        </Form.Item>

        {editorReady && (
          <Form.Item
            key={editingProduct?.id || 'new'}
            label='Nội dung'
            name='content'
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
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
