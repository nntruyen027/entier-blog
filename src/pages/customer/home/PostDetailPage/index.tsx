import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPostStart, likePostStart, unlikePostStart } from '~/redux/post/slice';
import { Empty, FloatButton, Typography } from 'antd';
import { QuillContent } from '~/components'; // Import the new component
import { formatDate } from '~/utils/date';
import { CommentOutlined, DislikeOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Component = () => {
  const { id } = useParams();
  const { post } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostStart(id));
  }, [id]);

  const hanleLike = () => {
    dispatch(likePostStart(id));
  };

  const handleUnlike = () => {
    dispatch(unlikePostStart(id));
  };

  useEffect(() => {
    if (!post?.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
    });
  }, [post?.content]);

  return (
    <div className='grid grid-cols-12'>
      <div className={'col-span-2 '} />
      <div className={'col-span-8'}>
        <div className='w-full grid col-span-8 max-w-screen-lg bg-white'>
          {post?.image ? <img src={post?.image} className='w-full' alt={post.title} /> : <Empty />}
          <Title className='my-3' level={2}>
            {post?.title}
          </Title>
          <div className='w-full flex justify-start text-left p-3 italic'>{post?.description}</div>
          <div className='w-full flex justify-between text-left p-3 italic'>
            <span>{post?.createAt && formatDate(post?.createAt, 'DD/MM/YYYY')}</span>
            <span>{post?.author?.fullName}</span>
          </div>
          <QuillContent content={post?.content} showToc={false} />
        </div>
        <div id='comment-section' className='w-full max-w-screen-lg mt-8 p-3 text-left bg-white'>
          <Title level={4}>Bình luận</Title>
        </div>
      </div>
      <div className={'col-span-2 '} />

      <FloatButton.BackTop style={{ bottom: 100 }} />
      <FloatButton.Group
        trigger='click'
        icon={<EllipsisOutlined />}
        style={{ right: 24, bottom: 50 }}
        shape='circle'
        placement='left'
      >
        {post?.liked ? (
          <FloatButton icon={<DislikeOutlined />} onClick={handleUnlike} />
        ) : (
          <FloatButton icon={<LikeOutlined />} onClick={hanleLike} />
        )}
        <FloatButton
          icon={<CommentOutlined />}
          onClick={() => {
            const el = document.getElementById('comment-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </FloatButton.Group>
    </div>
  );
};

export default Component;
