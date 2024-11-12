import { Box, Paper } from '@mui/material';
import { Item } from '~/types';
import { ItemComponent } from '~/components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface ProductListProps {
  title: string;
  items: Item[];
  url: string | null;
}

const ProductList: React.FC<ProductListProps> = ({ title, items, url }) => {
  const { t } = useTranslation();
  return (
    <Paper id='product-list'>
      <div className='first-letter:uppercase font-bold text-2xl text-left m-4'>{title}</div>
      <Box
        p={0}
        className='w-full grid gap-3'
        sx={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
          justifyItems: 'center'
        }}
      >
        {items
          .filter((value, index) => index < 10)
          .map((item, index) => (
            <ItemComponent key={index} item={item} />
          ))}
      </Box>
      <div className={'my-3'}>
        <Link to={url}>
          <span className={'first-letter:uppercase mr-3'}>{t('more')}</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </Paper>
  );
};

export default ProductList;
