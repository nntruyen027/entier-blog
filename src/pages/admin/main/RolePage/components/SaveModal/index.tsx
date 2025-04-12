import { Form, Input, Modal } from 'antd';

const Page = ({ isModalOpen, onCancel, form, onSave, editingRole }) => {
  const isEditing = !!editingRole;

  return (
    <Modal
      title={isEditing ? 'Cập nhật thông tin quyền' : 'Thêm quyền mới'}
      open={isModalOpen}
      centered
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Cập nhật' : 'Tạo'}
      cancelText='Hủy'
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Form.Item label='Tên quyền' name='roleName' rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}>
          <Input placeholder='VD: JavaScript, DevOps...' autoFocus />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Mô tả ngắn gọn...' rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Page;
