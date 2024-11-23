import { CartItem, ConsigneeComponent, EmptyComponent } from './components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { cartItem as data } from '~/data/fake';
import { CartItem as CartItemType } from '~/types';
import { Divider } from '~/components';
import { formatCurrency } from '~/utils/currency';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';

const isEmpty = false;

const CartPage = () => {
  const { t } = useTranslation();
  const [isOnlinePayment, setIsOnlinePayment] = useState<boolean>(false);

  const totalProducts = data.reduce((total, item) => total + item.quantity, 0);
  const estimatedCost = data.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const deliveryCost = 140000;

  if (isEmpty) return <EmptyComponent />;

  return (
    <div className={'w-1/2 m-auto'}>
      <div className={'relative top-0 left-0 px-2'}>
        <Link to={'/'} className={'absolute top-0 left-2 text-black'}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <span className={'capitalize font-bold'}>{t('cart')}</span>
      </div>
      <div className={'bg-white my-2 py-4 px-3'}>
        <ConsigneeComponent />
        {data.map((value: CartItemType, index: number) => (
          <div key={index}>
            {index > 0 && <Divider bold={1} />}
            <CartItem item={value} />
          </div>
        ))}
        <div className={'flex justify-between mt-8 text-sm'}>
          <span className={'inline-block lowercase first-letter:uppercase'}>
            {t('estimated-cost')}: ({totalProducts} {t('product')})
          </span>
          <span>{formatCurrency(estimatedCost)}</span>
        </div>
      </div>
      <div className={'bg-white my-2 py-2 px-3'}>
        <div className={'text-left my-3 mb-6 font-bold lowercase first-letter:uppercase'}>{t('recipient-info')}</div>
        <div className={'rounded-lg border-[#eaecf0] border-[1.5px] border-solid pt-3'}>
          {data.map((value: CartItemType, index: number) => (
            <div key={index} className={'px-3'}>
              {index > 0 && <Divider bold={1} />}
              <div className={'py-2 flex gap-2 text-sm'}>
                <img alt={value.product.name} src={value.product.img} className={'w-[45px]'} />
                <div className={'text-left'}>
                  <div className={'capitalize'}>{value.product.name}</div>
                  <div className={'quantity text-[#919191]'}>{`${t('quantity')}: ${value.quantity}`}</div>
                </div>
              </div>
            </div>
          ))}
          <div className={'flex flex-col gap-3 bg-[rgb(246,247,249)] p-3'}>
            <div className={'flex justify-between text-sm'}>
              <span className={'inline-block lowercase first-letter:uppercase'}>{t('delivery-cost')}:</span>
              <span>{formatCurrency(deliveryCost)}</span>
            </div>
            <Divider bold={1} />
            <div className={'flex justify-between text-sm'}>
              <span className={'inline-block lowercase first-letter:uppercase'}>
                {t('estimated-cost')}: ({totalProducts} {t('product')})
              </span>
              <span>{formatCurrency(estimatedCost)}</span>
            </div>
            <Divider bold={1} />
            <div className={'flex justify-between text-sm font-bold'}>
              <span className={'inline-block lowercase first-letter:uppercase'}>{t('total-cost')}:</span>
              <span>{formatCurrency(estimatedCost + deliveryCost)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={'bg-white my-2 py-4 px-3'}>
        <div className={'text-left my-2 mb-6 font-bold lowercase first-letter:uppercase'}>{t('payment')}</div>
        <FormControl fullWidth>
          <RadioGroup value={isOnlinePayment} onChange={(e) => setIsOnlinePayment(e.target.value === 'true')}>
            <FormControlLabel
              sx={{
                '& .MuiFormControlLabel-label': {
                  textTransform: 'lowercase',
                  display: 'inline-block',
                  '&:first-letter': {
                    textTransform: 'uppercase'
                  }
                }
              }}
              value={true}
              control={<Radio />}
              label={t('online')}
            />
            <FormControlLabel
              sx={{
                '& .MuiFormControlLabel-label': {
                  textTransform: 'lowercase',
                  display: 'inline-block',
                  '&:first-letter': {
                    textTransform: 'uppercase'
                  }
                }
              }}
              value={false}
              control={<Radio />}
              label={t('cash')}
            />
          </RadioGroup>
        </FormControl>
        <button className={'w-full mt-3 bg-[rgb(252,118,0)] text-white lowercase first-letter:uppercase'}>
          {t('payment')}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
