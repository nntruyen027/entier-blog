import { Breadcrumbs, Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { carousel } from '~/data/fake';
import { Carousel, Filter } from '~/components';

const ProductTypePage = () => {
  const { t } = useTranslation();
  const { type } = useParams();

  return (
    <div className={'w-full flex flex-col gap-6'}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/'>{t('home')}</Link>
        <Typography sx={{ color: 'text.primary' }}>{type}</Typography>
      </Breadcrumbs>
      <Carousel data={carousel} />
      <Paper className={'p-3 text-left'}>
        <Filter />
      </Paper>
    </div>
  );
};

export default ProductTypePage;
