import { useEffect } from 'react';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPostStart } from '~/redux/post/slice';
import { Button, Empty, Image, Typography } from 'antd';
import { QuillContent } from '~/components'; // Import the new component
import { formatDate } from '~/utils/date';
import { ArrowUpOutlined } from '@ant-design/icons';
import useParamValue from '~/hooks/useParamValue';

const { Title } = Typography;

const Page = () => {
  const { value } = useParamValue('aboutMeUrl');
  const { post } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostStart(value));
  }, [value]);

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
    <div className='flex justify-center p-0'>
      <div className='w-full max-w-screen-lg bg-white'>
        {post?.image ? (
          <div className='w-full aspect-[2.63] overflow-hidden rounded-lg'>
            <Image src={post?.image} preview={false} className='w-full h-full object-cover' />
          </div>
        ) : (
          <Empty />
        )}
        <Title className='my-3' level={2}>
          {post?.title}
        </Title>
        <div className='w-full flex justify-start text-left p-3 italic'>{post?.description}</div>
        <div className='w-full flex justify-between text-left p-3 italic'>
          <span>{post?.createAt && formatDate(post?.createAt, 'DD/MM/YYYY')}</span>
          <span>{post?.author?.fullName}</span>
        </div>
        <div className={'p-3'}>
          <QuillContent content={post?.content} showToc={false} />
        </div>
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

export default Page;
