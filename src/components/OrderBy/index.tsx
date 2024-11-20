import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

interface OrderByProps {
  value: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const OrderBy: React.FC<OrderByProps> = ({ value, setSelected, selected }) => {
  const { t } = useTranslation();

  return (
    <div className={'my-3'}>
      <span className={'mr-2 first-letter:uppercase'}>
        {t('order-by')}
        {': '}
      </span>
      {value.map((item, index) => (
        <span
          onClick={(e) => setSelected(e.currentTarget.textContent)}
          className={`mx-2 cursor-pointer ${selected == item ? 'text-[rgb(42,131,233,1)] ' : 'text-[rgb(102,112,133)]'}`}
          key={index}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default OrderBy;
