import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPostStart } from '~/redux/post/slice';
import { Button, Empty, Typography } from 'antd';
import { QuillContent } from '~/components'; // Import the new component
import { formatDate } from '~/utils/date';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Component = () => {
  const { id } = useParams();
  const { post } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostStart(id));
  }, [id]);

  useEffect(() => {
    if (!post?.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    headings.forEach((heading, index) => {
      const level = Number(heading.tagName.slice(1));
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
    });
  }, [post?.content]);

  return (
    <div className='flex justify-center p-4'>
      <div className='w-full max-w-screen-lg bg-white'>
        {post?.image ? <img src={post?.image} className='w-full' alt={post.title} /> : <Empty />}
        <Title className='my-3' level={2}>
          {post?.title}
        </Title>
        <div className='w-full flex justify-start text-left p-3 italic'>{post?.description}</div>
        <div className='w-full flex justify-between text-left p-3 italic'>
          <span>{post?.createAt && formatDate(post?.createAt, 'DD/MM/YYYY')}</span>
          <span>{post?.author.fullName}</span>
        </div>
        <QuillContent content={post?.content} />
      </div>

      <Button
        type='primary'
        shape='circle'
        icon={<ArrowUpOutlined />}
        size='large'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      />
    </div>
  );
};

export default Component;
