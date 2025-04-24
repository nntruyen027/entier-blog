import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPostStart, likePostStart, unlikePostStart } from '~/redux/post/slice';
import { FloatButton, Typography } from 'antd';
import { CommentOutlined, EllipsisOutlined, HeartFilled } from '@ant-design/icons';
import { CommentComponent, PostComponent } from './components';

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
        <PostComponent post={post} />
        <CommentComponent post={post} />
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
          <FloatButton icon={<HeartFilled className={'text-red-500'} />} onClick={handleUnlike} />
        ) : (
          <FloatButton icon={<HeartFilled />} onClick={hanleLike} />
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
