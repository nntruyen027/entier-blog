import {
  EarningsMonthly,
  EarningsQuarterly,
  ExpensesMonthly,
  ExpensesQuarterly,
  InvoiceQuarterly,
  ReceiptQuarterly
} from './components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProductsStart } from '~/redux/product/slice';
import Grid from '@mui/material/Grid';

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsStart({}));
  }, [dispatch]);

  return (
    <div className='mt-3 flex flex-col gap-8'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InvoiceQuarterly />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReceiptQuarterly />
        </Grid>
      </Grid>

      {/* Quý: Thu & Chi */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <EarningsQuarterly />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpensesQuarterly />
        </Grid>
      </Grid>

      {/* Tháng: Thu & Chi */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <EarningsMonthly />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpensesMonthly />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
