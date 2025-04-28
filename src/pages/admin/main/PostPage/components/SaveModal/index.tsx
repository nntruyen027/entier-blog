import { useEffect, useState } from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { EditorField } from '~/components';
import AvatarUploader from '../AvatarUploader';

const SaveModal = ({ isModalOpen, onCancel, form, onSave, editingPost }) => {
  const isEditing = !!editingPost;
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setEditorReady(true); // Trigger re-render editor sau khi modal hiển thị
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setEditorReady(false);
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
      width={'80%'}
    >
      <Form form={form} layout='vertical' onFinish={onSave}>
        <Form.Item label='Tiêu đề' name='title' rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
          <Input placeholder='VD: Làm quen với React, DevOps cơ bản...' autoFocus />
        </Form.Item>
        <div className={'flex gap-3'}>
          <Form.Item label='Mô tả' name='description' className={'w-full'}>
            <Input.TextArea placeholder='Mô tả ngắn gọn nội dung bài viết...' rows={4} />
          </Form.Item>
          <Form.Item label='Hình ảnh' name='image' valuePropName='value' getValueFromEvent={(e) => e}>
            <AvatarUploader form={form} />
          </Form.Item>
        </div>

        {editorReady && (
          <Form.Item
            key={editingPost?.id || 'new'}
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
