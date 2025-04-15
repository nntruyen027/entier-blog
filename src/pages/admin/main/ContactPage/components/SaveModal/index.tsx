import { Form, Input, Modal } from 'antd';

const Page = ({ isModalOpen, onCancel, form, onSave, editingContactType }) => {
  const isEditing = !!editingContactType;

  return (
    <Modal
      title={isEditing ? 'Cập nhật thông tin loại liên hệ' : 'Thêm loại liên hệ mới'}
      open={isModalOpen}
      centered
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Cập nhật' : 'Tạo'}
      cancelText='Hủy'
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Form.Item
          label='Tên loại liên hệ'
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên loại liên hệ!' }]}
        >
          <Input placeholder='VD: Đặt hàng, kết bạn' autoFocus />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Mô tả ngắn gọn...' rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Page;
