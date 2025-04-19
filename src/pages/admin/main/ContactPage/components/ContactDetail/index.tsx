import { Descriptions, Modal } from 'antd';

const ContactDetailModal = ({ open, onClose, contact }: { open: boolean; onClose: () => void; contact: any }) => {
  if (!contact) return null;

  return (
    <Modal open={open} title='Chi tiết liên hệ' onCancel={onClose} onOk={onClose} footer={null} width={700}>
      <Descriptions
        column={2}
        bordered
        size='middle'
        labelStyle={{ width: '30%' }}
        contentStyle={{ wordBreak: 'break-word' }}
      >
        <Descriptions.Item label='Họ và tên'>{contact.author}</Descriptions.Item>
        <Descriptions.Item label='Số điện thoại'>{contact.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label='Email'>{contact.email}</Descriptions.Item>
        <Descriptions.Item label='Nghề nghiệp'>{contact.career}</Descriptions.Item>
        <Descriptions.Item label='Tiêu đề' span={2}>
          {contact.title}
        </Descriptions.Item>
        <Descriptions.Item label='Chủ đề liên hệ' span={2}>
          {contact.type?.name}
        </Descriptions.Item>
        <Descriptions.Item label='Mô tả chủ đề' span={2}>
          {contact.type?.description}
        </Descriptions.Item>
        <Descriptions.Item label='Nội dung' span={2}>
          <div className='prose' dangerouslySetInnerHTML={{ __html: contact.content }} />
        </Descriptions.Item>
        <Descriptions.Item label='Ngày tạo'>{new Date(contact.createAt).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label='Ngày cập nhật'>{new Date(contact.updatedAt).toLocaleString()}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ContactDetailModal;
