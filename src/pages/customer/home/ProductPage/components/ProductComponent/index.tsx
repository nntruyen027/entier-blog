import { Button, Card, Empty, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { truncate } from '~/utils/string';
import { useNavigate } from 'react-router-dom';
import { Tag } from '~/components';
import { formatCurrency } from '~/utils/currency';
import { EyeOutlined } from '@ant-design/icons';

const Component = ({ product }) => {
  const nav = useNavigate();

  return (
    <Card
      className='w-full text-left shadow-md hover:shadow-xl transition-all rounded-2xl overflow-hidden border border-gray-200'
      onClick={() => nav(`${product.id}`)}
      hoverable
      cover={
        <div className='relative group w-full aspect-[4/3] bg-gray-100'>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}

          {/* Nút xem chi tiết nổi lên khi hover */}
          <div className='absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'>
            <Button
              type='primary'
              icon={<EyeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                nav(`${product.id}`);
              }}
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      }
    >
      <div className='mb-2 flex items-center justify-between'>
        <span className='text-lg font-bold text-blue-600 flex items-center gap-1'>{formatCurrency(product.price)}</span>
      </div>

      {/* Tên sản phẩm (có tooltip nếu dài) */}
      <Tooltip title={product.name}>
        <div className='font-semibold text-base text-gray-800 leading-tight mb-1 break-words line-clamp-2'>
          {product.name}
        </div>
      </Tooltip>

      <Meta
        description={<div className='text-gray-600 text-sm line-clamp-3'>{truncate(product.description, 120)}</div>}
      />

      {product?.tags?.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-1'>
          {product.tags.map((item) => (
            <Tooltip key={item.name} title={item.name}>
              <Tag name={item.name} color={item.color} />
            </Tooltip>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Component;
