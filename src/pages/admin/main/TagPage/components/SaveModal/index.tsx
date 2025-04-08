import { Form, Input, Modal } from 'antd';

const Page = ({ isModalOpen, onCancel, form, onSave }) => {
  return (
    <Modal
      title='Thêm thẻ mới'
      open={isModalOpen}
      centered
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText='Tạo'
      cancelText='Hủy'
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Form.Item label='Tên thẻ' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên thẻ!' }]}>
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
