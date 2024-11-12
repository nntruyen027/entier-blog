import { Link } from 'react-router-dom';
import { Item } from '~/types';

interface ProductPaperProps {
  item: Item | null;
}

const ProductPaper: React.FC<ProductPaperProps> = ({ item }) => (
  <Link to={item.url}>
    <div className='border min-h-[400px] px-4 py-2 border-gray-200 w-48 flex flex-col gap-3 rounded-lg'>
      <div className='h-fit text-left flex gap-1 flex-wrap'>
        {item.labels.map((label, labelIndex) => (
          <span
            key={labelIndex}
            style={{
              color: label.color,
              backgroundColor: label.bg,
              fontSize: '10px',
              padding: '3px',
              letterSpacing: '1px'
            }}
            className='rounded-sm'
          >
            {label.content}
          </span>
        ))}
      </div>
      <img
        src={item.img}
        alt={item.name}
        className='w-36 h-36 object-cover m-0 hover:-translate-y-2 transition-transform duration-300 ease-in-out'
      />

      <div className='text-left mt-0 flex flex-col gap-1'>
        <Link to={item.url} className='text-black'>
          <h3 className='text-sm m-0'>{item.name}</h3>
        </Link>

        <div className='h-fit flex gap-1 flex-wrap justify-center'>
          {item.compares.map((compare, compareIndex) => (
            <span
              key={compareIndex}
              style={{
                color: compare.color,
                backgroundColor: compare.bg,
                fontSize: '10px',
                padding: '3px',
                letterSpacing: '1px'
              }}
              className='rounded-sm'
            >
              {compare.content}
            </span>
          ))}
        </div>

        {/* Price Details */}
        <div className='text-red-500 font-bold m-0'>{item.price.toLocaleString()}₫</div>
        <div className='text-gray-500 line-through m-0'>
          {item.originalPrice?.toLocaleString()}
          {item.originalPrice && '₫'}
        </div>

        {/* Gift Section */}
        <div className='text-sm text-gray-500 m-0'>Quà tặng: {item.gift}</div>

        {/* Rating Section */}
        <div className='text-black-500 text-sm m-0'>
          <i className='fa-solid fa-star text-yellow-300'></i> {item.rating}
        </div>
      </div>
    </div>
  </Link>
);

export default ProductPaper;
