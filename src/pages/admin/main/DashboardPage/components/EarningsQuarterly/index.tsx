import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useEffect, useState } from 'react';
import { doQuarterlyStatisticsStart } from '~/redux/invoice/slice';
import { QuarterlyStatisticsComponent } from '~/pages/admin/main/DashboardPage/components';
import { useTranslation } from 'react-i18next';

const Component = () => {
  const dispatch = useDispatch();
  const { quarterlyStatistics } = useSelector((state: RootState) => state.invoice);
  const [productList, setProductList] = useState<string[]>([]);
  const [chartData, setChartData] = useState<{ quarter: string; [key: string]: number | string }[]>([]);
  const { t } = useTranslation();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(doQuarterlyStatisticsStart({ nam: 2025 }));
  }, [dispatch]);

  useEffect(() => {
    if (!quarterlyStatistics) return;

    const result: { quarter: string; [key: string]: number | string }[] = [];
    const allItemIds = new Set<string>();

    Object.values(quarterlyStatistics).forEach((items) => {
      Object.values(items).forEach(({ itemId }) => {
        const product = products.find(({ id }) => id == itemId);
        allItemIds.add(product?.name);
      });
    });

    Object.entries(quarterlyStatistics).forEach(([quarter, items]) => {
      const quarterData: { quarter: string; [key: string]: number | string } = { quarter: `Quý ${quarter}` };

      allItemIds.forEach((itemId) => {
        const product = products.find(({ name }) => name == itemId);
        quarterData[product?.name] = 0;
      });

      Object.values(items).forEach(({ itemId, soLuong }) => {
        const product = products.find(({ id }) => id == itemId);
        quarterData[product?.name] = soLuong;
      });

      result.push(quarterData);
    });

    setProductList([...allItemIds]);
    setChartData(result);
  }, [quarterlyStatistics, products]);

  return <QuarterlyStatisticsComponent lines={productList} data={chartData} name={'Doanh thu theo quý'} />;
};

export default Component;
