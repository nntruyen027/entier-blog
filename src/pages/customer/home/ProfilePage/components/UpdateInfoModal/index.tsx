import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { AvatarUploader } from '~/pages/admin/main/UserPage/components';

const GENDER_OPTIONS = [
  { label: 'Nam', value: true },
  { label: 'Nữ', value: false }
];

const CustomModal = ({ isOpen, onSave, onCancel, form }) => {
  return (
    <Modal
      title='Chỉnh sửa thông tin cá nhân'
      open={isOpen}
      centered
      width='50%'
      okText='Cập nhật'
      cancelText='Hủy'
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Số điện thoại'
              name='phoneNumber'
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { pattern: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ' }
              ]}
            >
              <Input placeholder='0704776898' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Thư điện tử'
              name='email'
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder='absh@gmail.com' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
              <Input placeholder='vd: 123 Lê Lợi, Quận 1' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Giới tính' name='isMale' rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
              <Select options={GENDER_OPTIONS} placeholder='Chọn giới tính' allowClear />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label='Avatar'
              name='avatar'
              valuePropName='value'
              getValueFromEvent={(e) => e}
              rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện' }]}
            >
              <AvatarUploader form={form} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CustomModal;
