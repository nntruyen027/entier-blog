import { Table } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { createPostStart, deletePostStart, getPostsStart, updatePostStart } from '~/redux/post/slice';
import { ColumnsType } from 'antd/es/table';
import { SaveModal } from './components';
import { Button, Form, Input, Popconfirm, Space, Tag } from 'antd';
import { EyeOutlined, LikeOutlined, SearchOutlined } from '@ant-design/icons';

const Page = () => {
  const dispatch = useDispatch();
  const { posts, pageCount, rowCount, loading } = useSelector((state: RootState) => state.post);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        getPostsStart({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          keyword: searchKeyword
        })
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, pagination]);

  const handleSave = (values: any) => {
    const preservedFields = editingPost
      ? {
          likeCount: editingPost.likeCount,
          viewCount: editingPost.viewCount,
          author: editingPost.author,
          createdAt: editingPost.createdAt
        }
      : {};

    const fullPostData = { ...preservedFields, ...values };

    if (editingPost) {
      dispatch(updatePostStart({ id: editingPost.id, body: { ...editingPost, ...values } }));
    } else {
      dispatch(createPostStart(fullPostData));
    }

    form.resetFields();
    setEditingPost(null);
    setIsModalOpen(false);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    form.setFieldsValue(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deletePostStart(id));
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingPost(null);
    setIsModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      key: 'index',
      align: 'center',
      width: 100,
      render: (_: any, __: any, index: number) => pagination.pageIndex * pagination.pageSize + index + 1
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 350
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      width: 200,
      render: (value) => value.fullName
    },
    {
      title: 'Hashtag',
      dataIndex: 'hashtags',
      key: 'hashtags',
      width: 200,
      render: (hashtags: string[]) => (
        <div>
          {hashtags && hashtags.length > 0 ? (
            hashtags.map((hashtag, index) => (
              <Tag key={index} color='blue'>
                {hashtag}
              </Tag>
            ))
          ) : (
            <span>Không có hashtag</span>
          )}
        </div>
      )
    },
    {
      title: 'Lượt thích',
      dataIndex: 'likeCount',
      key: 'likeCount',
      width: 100,
      align: 'center',
      render: (count: number) => (
        <span>
          <LikeOutlined className='text-blue-500 mr-1' />
          {count}
        </span>
      )
    },
    {
      title: 'Lượt xem',
      dataIndex: 'viewCount',
      key: 'viewCount',
      align: 'center',
      width: 100,
      render: (count: number) => (
        <span>
          <EyeOutlined className='text-green-500 mr-1' />
          {count}
        </span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isPublic',
      key: 'isPublic',
      align: 'center',
      width: 100,
      render: (isPublic: boolean) => (isPublic ? <Tag color='green'>Công khai</Tag> : <Tag color='orange'>Cá nhân</Tag>)
    },
    {
      title: 'Hành động',
      width: 150,
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='link' onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title='Bạn có chắc muốn xóa bài viết này?'
            okText='Xóa'
            cancelText='Hủy'
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type='link' danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <SaveModal
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        form={form}
        onSave={handleSave}
        editingPost={editingPost}
      />
      <div className='flex justify-between mb-4'>
        <Input
          placeholder='Tìm theo tên bài viết...'
          prefix={<SearchOutlined />}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          allowClear
          className='max-w-sm'
        />
        <Button
          type='primary'
          onClick={() => {
            form.resetFields();
            form.setFieldsValue({ color: '#000000' });
            setEditingPost(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm bài viết
        </Button>
      </div>

      <Table
        isLoading={loading}
        columns={columns}
        data={posts}
        setPagination={setPagination}
        pagination={pagination}
        rowCount={rowCount}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Page;
