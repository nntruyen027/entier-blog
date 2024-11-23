import { CartItem } from '~/types';
import { formatCurrency } from '~/utils/currency';
import { useTranslation } from 'react-i18next';
import { NumberStepper } from '~/components';
import { useState } from 'react';

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { t } = useTranslation();
  return (
    <div>
      <div className={'text-sm my-2'}>
        <div className={'flex justify-between gap-2'}>
          <img className={'h-[80px]'} alt={item.product.name} src={item.product.img} />
          <div className={'w-full'}>
            <div className={'flex justify-between text-sm'}>
              <span>{item.product.name}</span>
              <span className={'text-[rgb(221,47,44)]'}>{formatCurrency(item.product.price)}</span>
            </div>
          </div>
        </div>
        <div className={'flex justify-end gap-2'}>
          <button className={'p-1 rounded-none bg-white text-[#6e6e6e]'}>{t('delete')}</button>
          <NumberStepper value={quantity} onChange={(e) => setQuantity(e)} max={10000} min={1} step={1} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
