import { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import 'react-quill/dist/quill.snow.css';

const SaveModal = ({ isModalOpen, onCancel, form, onSave, editingProductType }) => {
  const isEditing = !!editingProductType;
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setEditorReady(true); // Trigger re-render editor sau khi modal hiển thị
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setEditorReady(false); // Reset khi đóng modal
    }
  }, [isModalOpen]);

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
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Form.Item label='Tên loại sản phẩm' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
          <Input placeholder='VD: Quản lý kho...' autoFocus />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Mô tả ngắn gọn nội dung...' rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveModal;
