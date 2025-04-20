import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPostStart } from '~/redux/post/slice';
import { Button, Collapse, Empty, Menu, MenuProps, Typography } from 'antd';
import { QuillContent, Tag } from '~/components'; // Import the new component
import { formatDate } from '~/utils/date';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Component = () => {
  const { id } = useParams();
  const { post } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    dispatch(getPostStart(id));
  }, [id]);

  useEffect(() => {
    if (!post?.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const newToc: { id: string; text: string; level: number }[] = [];

    headings.forEach((heading, index) => {
      const level = Number(heading.tagName.slice(1));
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
      newToc.push({ id, text: heading.textContent || '', level });
    });

    setToc(newToc);
  }, [post?.content]);

  const scrollToHeading = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems: MenuProps['items'] = toc.map((item) => ({
    key: item.id,
    label: <span style={{ marginLeft: `${(item.level - 1) * 12}px` }}>{item.text}</span>,
    onClick: () => scrollToHeading(item.id)
  }));

  return (
    <div className='flex justify-center p-4'>
      <div className='w-full max-w-screen-lg bg-white'>
        {post?.image ? <img src={post?.image} className='w-full' alt={post.title} /> : <Empty />}
        <Title className='my-3' level={2}>
          {post?.title}
        </Title>
        <div className='w-full flex justify-start text-left p-3 italic'>{post?.description}</div>
        <div className='w-full flex justify-start text-left p-3 italic'>
          {post?.createAt && formatDate(post?.createAt, 'DD/MM/YYYY')}
        </div>

        <div className='w-full'>
          <Collapse
            className='text-left mb-3 w-full'
            items={[{ key: '1', label: 'Mục lục', children: <Menu mode='vertical' items={menuItems} /> }]}
          />
        </div>

        {/* Use QuillContent component here */}
        <QuillContent content={post?.content} />

        <div className='flex justify-start gap-2 p-3 items-center'>
          {post?.tags.map((tag) => <Tag key={tag.name} name={tag.name} color={tag.color} />)}
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

export default Component;
