import { Card, Empty } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { truncate } from '~/utils/string';
import { useNavigate } from 'react-router-dom';
import { Tag } from '~/components';
import { formatCurrency } from '~/utils/currency';

const Component = ({ product }) => {
  const nav = useNavigate();
  return (
    <Card
      className='w-1/5 text-left'
      onClick={() => nav(`${product.id}`)}
      hoverable
      cover={
        <div className='w-full p-0 aspect-[2/2] bg-gray-100 relative top-0 left-0'>
          {product.image ? (
            <img src={product.image} alt={product.name} className='absolute top-0 left-0 w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      }
    >
      <div className={'w-full font-bold text-xl flex'}>{formatCurrency(product.price)}</div>
      <Meta
        title={<div className='whitespace-normal break-words'>{product.name}</div>}
        description={truncate(product.description, 120)}
      />
      <div className={'mt-3 flex flex-wrap gap-1'}>
        {product?.tags?.map((item) => <Tag name={item.name} color={item.color} />)}
      </div>
    </Card>
  );
};

export default Component;
