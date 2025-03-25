import {
  EarningsMonthly,
  EarningsQuarterly,
  ExpensesMonthly,
  ExpensesQuarterly,
  Filter,
  InvoiceQuarterly,
  ReceiptQuarterly
} from './components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProductsStart } from '~/redux/product/slice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsStart({}));
  }, [dispatch]);

  return (
    <div className={'mt-3 flex flex-col gap-8'}>
      <Filter />
      <div className={'w-full flex justify-around'}>
        <InvoiceQuarterly />
        <ReceiptQuarterly />
      </div>
      <div className={'w-full flex justify-around'}>
        <EarningsQuarterly />
        <ExpensesQuarterly />
      </div>
      <div className={'w-full flex justify-around'}>
        <EarningsMonthly />
        <ExpensesMonthly />
      </div>
    </div>
  );
};

export default DashboardPage;
