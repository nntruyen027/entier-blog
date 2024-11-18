import { Breadcrumbs, Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { carousel, productAttributes } from '~/data/fake.js';
import { Carousel, Filter } from '~/components';
import { useState } from 'react';

const ProductTypePage = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const [filter, setFilter] = useState<string[]>();

  return (
    <div className={'w-full flex flex-col gap-6'}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/'>{t('home')}</Link>
        <Typography sx={{ color: 'text.primary' }}>{type}</Typography>
      </Breadcrumbs>
      <Carousel data={carousel} />
      <Paper className={'p-3 text-left'}>
        <Filter productAttributes={productAttributes} filter={filter} setFilter={setFilter} />
      </Paper>
    </div>
  );
};

export default ProductTypePage;
