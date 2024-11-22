import { Banner, Carousel, ItemComponent, MultiTabList, NewComponent, ProductList } from '~/components';
import { useTranslation } from 'react-i18next';
import { carousel, multiTabs, multiTabsNew } from '~/data/fake.js';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className={'w-full flex flex-col gap-6'}>
      <Banner />
      <MultiTabList title={t('online-sale')} data={multiTabs} ItemComponent={ItemComponent} />
      <Carousel data={carousel} />
      <ProductList title={t('recommend')} items={multiTabs[2].items} url={'/recommend'} />
      <MultiTabList title={t('news')} data={multiTabsNew} ItemComponent={NewComponent} />
      {/*< />*/}
    </div>
  );
};

export default HomePage;
