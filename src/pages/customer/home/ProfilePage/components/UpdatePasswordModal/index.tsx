import { Form, Input, Modal } from 'antd';

const CustomModal = ({ isOpen, onSave, onCancel, form }) => {
  return (
    <Modal
      title='Thay đổi mật khẩu'
      open={isOpen}
      centered
      width={600}
      okText='Cập nhật'
      cancelText='Hủy'
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Form.Item
          label='Mật khẩu cũ'
          name='oldpass'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
          hasFeedback
        >
          <Input.Password placeholder='Nhập mật khẩu cũ' />
        </Form.Item>

        <Form.Item
          label='Mật khẩu mới'
          name='newpass'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
          hasFeedback
        >
          <Input.Password placeholder='Nhập mật khẩu mới' />
        </Form.Item>

        <Form.Item
          label='Xác nhận mật khẩu mới'
          name='confirmNewPass'
          dependencies={['newpass']}
          hasFeedback
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newpass') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
              }
            })
          ]}
        >
          <Input.Password placeholder='Xác nhận mật khẩu mới' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomModal;
