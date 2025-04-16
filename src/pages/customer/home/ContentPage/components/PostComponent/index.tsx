import { Card, Empty } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { truncate } from '~/utils/string';
import { useNavigate } from 'react-router-dom';

const Component = ({ post }) => {
  const nav = useNavigate();
  return (
    <Card
      className='w-1/5 text-left'
      onClick={() => nav(`${post.id}`)}
      hoverable
      cover={
        <div className='w-full aspect-[2/1] bg-gray-100 relative top-0 left-0'>
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
      <Meta title={post.title} description={truncate(post.description, 120)} />
    </Card>
  );
};

export default Component;
