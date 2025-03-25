import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { doMonthlyStatisticsStart } from '~/redux/invoice/slice';
import { MonthlyStatisticsComponent } from '~/pages/admin/main/DashboardPage/components';
import { useTranslation } from 'react-i18next';

const Component = () => {
  const dispatch = useDispatch();
  const { monthlyStatistics } = useSelector((state: RootState) => state.invoice);
  const [productList, setProductList] = useState<string[]>([]);
  const [chartData, setChartData] = useState<{ month: string; [key: string]: number | string }[]>([]);
  const { t } = useTranslation();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(doMonthlyStatisticsStart({ nam: 2025 }));
  }, [dispatch]);

  useEffect(() => {
    if (!monthlyStatistics) return;

    const result: { month: string; [key: string]: number | string }[] = [];
    const allItemIds = new Set<string>();

    Object.values(monthlyStatistics).forEach((items) => {
      Object.values(items).forEach(({ itemId }) => {
        const product = products.find(({ id }) => id == itemId);
        allItemIds.add(product?.name);
      });
    });

    Object.entries(monthlyStatistics).forEach(([month, items]) => {
      const monthData: { month: string; [key: string]: number | string } = { month: `Tháng ${month}` };

      allItemIds.forEach((itemId) => {
        const product = products.find(({ name }) => name == itemId);
        monthData[product?.name] = 0;
      });

      Object.values(items).forEach(({ itemId, soLuong }) => {
        const product = products.find(({ id }) => id == itemId);
        monthData[product?.name] = soLuong;
      });

      result.push(monthData);
    });

    setProductList([...allItemIds]);
    setChartData(result);
  }, [monthlyStatistics, products]);

  return <MonthlyStatisticsComponent lines={productList} data={chartData} name={'Doanh thu theo tháng'} />;
};

export default Component;
