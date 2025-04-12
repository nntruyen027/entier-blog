import { Form, Input, Modal } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { Tag } from '~/components';

const Page = ({ isModalOpen, onCancel, form, onSave, editingTag }) => {
  const isEditing = !!editingTag;
  const color = useWatch('color', form);
  const name = useWatch('name', form);

  return (
    <Modal
      title={isEditing ? 'Cập nhật thông tin thẻ' : 'Thêm thẻ mới'}
      open={isModalOpen}
      centered
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Cập nhật' : 'Tạo'}
      cancelText='Hủy'
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Form.Item label='Tên thẻ' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên thẻ!' }]}>
          <Input placeholder='VD: JavaScript, DevOps...' autoFocus />
        </Form.Item>

        <Form.Item label='Màu sắc' name='color'>
          <Input type='color' />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Mô tả ngắn gọn...' rows={3} />
        </Form.Item>

        {color && name && (
          <div className='mb-2'>
            <Tag name={name} color={color} />
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default Page;
