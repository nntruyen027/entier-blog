import { Card, Empty } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { truncate } from '~/utils/string';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/config';

const Component = ({ post }) => {
  const nav = useNavigate();

  return (
    <Card
      className='w-full text-left cursor-pointer shadow-sm hover:shadow-md transition-all'
      onClick={() => nav(`${routes.customer.home.news}/${post.id}`)}
      hoverable
      cover={
        <div className='w-full aspect-video bg-gray-100 relative'>
          {post.image ? (
            <img src={post.image} alt={post.title} className='absolute top-0 left-0 w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      }
    >
      <Meta
        title={<div className='font-semibold text-base'>{post.title}</div>}
        description={<div className='text-gray-600 text-sm line-clamp-3'>{truncate(post.description, 120)}</div>}
      />
    </Card>
  );
};

export default Component;
