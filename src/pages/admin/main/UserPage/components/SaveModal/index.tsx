import { Col, Divider, Form, Image, Input, Modal, Row, Select, Typography } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { AvatarUploader } from '~/pages/admin/main/UserPage/components';

const { Text } = Typography;

const GENDER_OPTIONS = [
  { label: 'Nam', value: true },
  { label: 'Nữ', value: false }
];

const SaveModal = ({ isModalOpen, onCancel, form, onSave, editingUser }) => {
  const isEditing = !!editingUser;
  const username = useWatch('username', form);
  const avatar = useWatch('avatar', form);

  return (
    <Modal
      title={isEditing ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}
      open={isModalOpen}
      centered
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Cập nhật' : 'Tạo'}
      cancelText='Hủy'
      width={700}
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        {/* Bắt buộc */}
        <Divider orientation='left'>Thông tin bắt buộc</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Tên đăng nhập'
              name='username'
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input placeholder='vd: johndoe' autoFocus />
            </Form.Item>
          </Col>

          {!isEditing && (
            <Col span={12}>
              <Form.Item
                label='Mật khẩu'
                name='password'
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password placeholder='••••••••' />
              </Form.Item>
            </Col>
          )}

          <Col span={12}>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, type: 'email', message: 'Vui lòng nhập đúng định dạng email!' }]}
            >
              <Input placeholder='vd: johndoe@example.com' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Họ và tên'
              name='fullName'
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input placeholder='vd: John Doe' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Số điện thoại'
              name='phoneNumber'
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input placeholder='vd: 0987654321' />
            </Form.Item>
          </Col>
        </Row>

        {/* Không bắt buộc */}
        <Divider orientation='left'>Thông tin bổ sung</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Địa chỉ' name='address'>
              <Input placeholder='vd: 123 Lê Lợi, Quận 1' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Giới tính' name='isMale'>
              <Select options={GENDER_OPTIONS} placeholder='Chọn giới tính' allowClear />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label='Avatar' name='avatar' valuePropName='value' getValueFromEvent={(e) => e}>
              <AvatarUploader form={form} />
            </Form.Item>
          </Col>
        </Row>

        {/* Xem trước avatar và tài khoản */}
        <Row justify='space-between' align='middle'>
          <Col>
            {username && (
              <Text type='secondary'>
                Tài khoản: <Text strong>{username}</Text>
              </Text>
            )}
          </Col>
          <Col>
            {avatar && (
              <Image
                src={avatar}
                alt='Avatar preview'
                width={48}
                height={48}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                preview={false}
                fallback='https://via.placeholder.com/48'
              />
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SaveModal;
