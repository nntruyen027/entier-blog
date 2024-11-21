import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const EmptyComponent = () => {
  const { t } = useTranslation();
  return (
    <div className={'h-full py-32'}>
      <img
        className={'m-auto'}
        width='432'
        src={'https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.9908d9bb9af32cb2a7591280e.png'}
        alt={'empty cart image'}
      />
      <Link to={'/'}>
        <button className={'mt-10 bg-[#2a83e9] text-white hover:text-[#2a83e9] hover:bg-white hover:border-[#2a83e9]'}>
          {t('return-home')}
        </button>
      </Link>
    </div>
  );
};

export default EmptyComponent;
