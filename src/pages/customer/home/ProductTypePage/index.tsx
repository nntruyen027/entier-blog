import { Breadcrumbs, Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { brands, carousel, multiTabs, orderBy as dataOrderBy, productAttributes, types, usages } from '~/data/fake.js';
import { Carousel, Filter, ItemComponent, OrderBy } from '~/components';
import { useState } from 'react';

const ProductTypePage = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const [filter, setFilter] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<string>('');
  const items = multiTabs[2].items;

  return (
    <div className={'w-full flex flex-col gap-6'}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/'>{t('home')}</Link>
        <Typography sx={{ color: 'text.primary' }}>{type}</Typography>
      </Breadcrumbs>
      <Carousel data={carousel} />
      <Paper className={'p-3 py-4 text-left'}>
        <Filter value={{ brands, productAttributes, usages, types }} filter={filter} setFilter={setFilter} />
        <OrderBy value={dataOrderBy} selected={orderBy} setSelected={setOrderBy} />
        <div
          className='w-full grid gap-3'
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
            justifyItems: 'center'
          }}
        >
          {items
            .filter((value, index) => index < 10)
            .map((item, index) => (
              <ItemComponent key={index} item={item} />
            ))}
        </div>
      </Paper>
    </div>
  );
};

export default ProductTypePage;
