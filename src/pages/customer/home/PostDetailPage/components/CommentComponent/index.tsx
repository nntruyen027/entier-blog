import React from 'react';
import { Avatar, Button, Dropdown, Form, MenuProps, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { EditorField } from '~/components';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { createCommentStart, deleteCommentStart, updateCommentStart } from '~/redux/post/slice';
import { formatDate } from '~/utils/date';

const Component = ({ post }) => {
  const { account } = useSelector((state: RootState) => state.auth);
  const [form] = useForm();
  const dispatch = useDispatch();

  const [editingCommentId, setEditingCommentId] = React.useState<number | null>(null);
  const [editingForm] = Form.useForm();

  const onFinish = (values) => {
    form.resetFields();
    dispatch(
      createCommentStart({
        id: post?.id,
        body: {
          post,
          userId: account?.id,
          content: values.content
        }
      })
    );
  };

  return (
    <div id='comment-section' className='w-full max-w-screen-lg mt-8 p-3 text-left bg-white'>
      <Typography.Title level={4}>Bình luận</Typography.Title>

      {/* Form bình luận mới */}
      <Form form={form} onFinish={onFinish}>
        <Form.Item name='content' rules={[{ required: true, message: 'Vui lòng nhập nội dung bình luận' }]}>
          <EditorField />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Gửi bình luận
          </Button>
        </Form.Item>
      </Form>

      {/* Danh sách bình luận */}
      <div className='mt-8 flex flex-col gap-3'>
        {[...(post?.comments || [])]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((comment) => {
            const isEditing = editingCommentId === comment.id;
            const isOwnComment = comment.user?.id === account?.id;

            const dropdownItems: MenuProps['items'] = [
              {
                key: 'edit',
                label: 'Sửa',
                onClick: () => {
                  setEditingCommentId(comment.id);
                  editingForm.setFieldsValue({ content: comment.content });
                }
              },
              {
                key: 'delete',
                label: <span className='text-red-500'>Xoá</span>,
                onClick: () => dispatch(deleteCommentStart(comment.id))
              }
            ];

            return (
              <div key={comment.id} className='shadow p-3 text-wrap relative'>
                {/* Info người bình luận */}
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3 italic'>
                    <Avatar src={comment?.user?.avatar} size='large' />
                    <div className='flex flex-col'>
                      <span className='font-bold'>{comment?.user?.fullName}</span>
                      <span>{comment?.createdAt && formatDate(comment?.createdAt, 'DD/MM/YYYY')}</span>
                    </div>
                  </div>

                  {isOwnComment && (
                    <Dropdown menu={{ items: dropdownItems }} trigger={['click']} placement='bottomRight' arrow>
                      <Button type='text' icon={<EllipsisOutlined />} />
                    </Dropdown>
                  )}
                </div>

                {/* Nội dung hoặc form chỉnh sửa */}
                {isEditing ? (
                  <Form
                    form={editingForm}
                    initialValues={{ content: comment.content }}
                    onFinish={(values) => {
                      form.resetFields();
                      dispatch(updateCommentStart({ id: comment.id, body: values }));
                      setEditingCommentId(null);
                    }}
                  >
                    <Form.Item name='content'>
                      <EditorField />
                    </Form.Item>
                    <Form.Item className='flex gap-2'>
                      <Button type='primary' htmlType='submit' className={'mr-2'}>
                        Lưu
                      </Button>
                      <Button onClick={() => setEditingCommentId(null)}>Huỷ</Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Component;
