import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { doMonthlyStatisticsStart } from '~/redux/receipt/slice';
import { MonthlyStatisticsComponent } from '~/pages/admin/main/DashboardPage/components';

const Component = () => {
  const dispatch = useDispatch();
  const { monthlyStatistics } = useSelector((state: RootState) => state.receipt);
  const [productList, setProductList] = useState<string[]>([]);
  const [chartData, setChartData] = useState<{ quarter: string; [key: string]: number | string }[]>([]);
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(doMonthlyStatisticsStart({ nam: 2025 }));
  }, [dispatch]);

  useEffect(() => {
    if (!monthlyStatistics) return;

    const result: { quarter: string; [key: string]: number | string }[] = [];
    const allItemIds = new Set<string>();

    Object.values(monthlyStatistics).forEach((items) => {
      Object.values(items).forEach(({ itemId }) => {
        const product = products.find(({ id }) => id == itemId);
        allItemIds.add(product?.name);
      });
    });

    Object.entries(monthlyStatistics).forEach(([quarter, items]) => {
      const quarterData: { quarter: string; [key: string]: number | string } = { quarter: `Tháng ${quarter}` };

      allItemIds.forEach((itemId) => {
        const product = products.find(({ name }) => name == itemId);
        quarterData[product?.name] = 0;
      });

      Object.values(items).forEach(({ itemId, tongTien }) => {
        const product = products.find(({ id }) => id == itemId);
        quarterData[product?.name] = tongTien;
      });

      result.push(quarterData);
    });

    setProductList([...allItemIds]);
    setChartData(result);
  }, [monthlyStatistics, products]);

  return <MonthlyStatisticsComponent lines={productList} data={chartData} name={'Chi tiêu theo tháng'} />;
};

export default Component;
