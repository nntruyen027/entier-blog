import { CartItem, ConsigneeComponent, EmptyComponent } from './components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { cartItem as data } from '~/data/fake';
import { CartItem as CartItemType } from '~/types';

const isEmpty = false;

const CartPage = () => {
  const { t } = useTranslation();
  if (isEmpty) return <EmptyComponent />;
  else
    return (
      <div className={'w-1/2 m-auto'}>
        <div className={'relative top-0 left-0 px-2'}>
          <Link to={'/'} className={'absolute top-0 left-2 text-black'}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
          <span className={'capitalize'}>{t('cart')}</span>
        </div>
        <div className={'bg-white my-2 py-2 px-3'}>
          <ConsigneeComponent />
          {data.map((value: CartItemType, index: number) => (
            <CartItem item={value} key={index} />
          ))}
        </div>
      </div>
    );
};

export default CartPage;
