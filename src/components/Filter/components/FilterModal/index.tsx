import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { Brand, ProductAttribute, Type, UsageNeed } from '~/types';
import { formatNumberToWordsLocalized } from '~/utils/currency';
import { Divider } from '@mui/material';

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  value: {
    brands: Brand[];
    types: Type[];
    usages: UsageNeed[];
    productAttributes: ProductAttribute[];
  } | null;
  filter: string[];
  setFilter: (strings: string[]) => void;
}

function toggleSelection<T>(prevSelected: T[], item: T): T[] {
  return prevSelected.includes(item)
    ? prevSelected.filter((selectedItem) => selectedItem !== item) // Remove if exists
    : [...prevSelected, item]; // Add if not exists
}

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, position, value, setFilter }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedUsages, setSelectedUsages] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilter([...selectedBrands, ...selectedPrices, ...selectedTypes, ...selectedUsages, ...selectedAttributes]);
  }, [selectedBrands, selectedPrices, selectedTypes, selectedUsages, selectedAttributes, setFilter]);

  const prices = [
    {
      label: t('under', { value: formatNumberToWordsLocalized(2000000) }),
      value: '<2000000'
    },
    {
      label: t('from-to', {
        min: formatNumberToWordsLocalized(2),
        max: formatNumberToWordsLocalized(4000000)
      }),
      value: '>=2000000&<4000000'
    },
    {
      label: t('from-to', {
        min: formatNumberToWordsLocalized(4),
        max: formatNumberToWordsLocalized(7000000)
      }),
      value: '>=4000000&<7000000'
    },
    {
      label: t('from-to', {
        min: formatNumberToWordsLocalized(7),
        max: formatNumberToWordsLocalized(13000000)
      }),
      value: '>=7000000&<13000000'
    },
    {
      label: t('from-to', {
        min: formatNumberToWordsLocalized(13),
        max: formatNumberToWordsLocalized(20000000)
      }),
      value: '>=13000000&<20000000'
    },
    {
      label: t('above', { value: formatNumberToWordsLocalized(20000000) }),
      value: '>=20000000'
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setSelectedBrands([]);
      setSelectedPrices([]);
      setSelectedTypes([]);
      setSelectedUsages([]);
      setSelectedAttributes([]);
    }
  }, [isVisible]);

  if (!isVisible || !value) return null;

  const toggleBrandSelection = (brandName: string) => {
    setSelectedBrands((prevSelected) => toggleSelection(prevSelected, brandName));
  };

  const togglePriceSelection = (price: string) => {
    setSelectedPrices((prevSelected) => toggleSelection(prevSelected, price));
  };

  const toggleTypeSelection = (type: string) => {
    setSelectedTypes((prevSelected) => toggleSelection(prevSelected, type));
  };

  const toggleUsageSelection = (usage: string) => {
    setSelectedUsages((prevSelected) => toggleSelection(prevSelected, usage));
  };

  const toggleAttributesSelection = (attributeValues: string) => {
    setSelectedAttributes((prevSelected) => toggleSelection(prevSelected, attributeValues));
  };

  return (
    <div
      ref={modalRef}
      className='fixed z-50 bg-white w-[890px] max-w-[890px] shadow-lg rounded-lg p-4 border custom-scrollbar'
      style={{
        left: position.left,
        top: position.top,
        position: 'absolute',
        maxHeight: '50vh',
        overflowY: 'auto'
      }}
    >
      <button
        onClick={onClose}
        className='absolute top-2 right-2 text-sm text-gray-600 bg-white border border-gray-300 p-2'
      >
        <FontAwesomeIcon icon={faClose} /> <span className='capitalize'>{t('close')}</span>
      </button>
      <div className='mt-10'>
        <h4 className='capitalize font-bold my-2'>{t('brand')}</h4>
        <div className='flex flex-wrap gap-3'>
          {value.brands.map((item, index) => (
            <button
              key={index}
              value={item.name}
              onClick={() => toggleBrandSelection(item.name)} // Handle selection
              className={`p-2 bg-white border ${selectedBrands.includes(item.name) ? 'border-[#2f80ed]' : 'border-gray-300'} hover:border-[#2f80ed]`}
            >
              <img className='h-5' alt={item.name} src={item.img} />
            </button>
          ))}
        </div>
      </div>
      <Divider sx={{ marginTop: '1rem' }} />
      <div className={'flex gap-3'}>
        <div className={'w-1/3'}>
          <h4 className='capitalize font-bold my-2'>{t('price')}</h4>
          <div className={'flex gap-3 flex-wrap'}>
            {prices.map((item, index) => (
              <button
                key={index}
                value={item.label}
                onClick={() => togglePriceSelection(item.label)} // Handle selection
                className={`p-2 bg-white border text-sm ${selectedPrices.includes(item.label) ? 'border-[#2f80ed]' : 'border-gray-300'} hover:border-[#2f80ed]`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className={'w-1/3'}>
          <h4 className='capitalize font-bold my-2'>{t('type')}</h4>
          <div className={'flex gap-3 flex-wrap'}>
            {value.types.map((item, index) => (
              <button
                key={index}
                value={item.name}
                onClick={() => toggleTypeSelection(item.name)} // Handle selection
                className={`p-2 flex flex-col gap-2 justify-center text-center bg-white border text-sm ${selectedTypes.includes(item.name) ? 'border-[#2f80ed]' : 'border-gray-300'} hover:border-[#2f80ed]`}
              >
                <img className='h-10 m-auto' alt={item.name} src={item.img} />
                <span className={'m-auto'}> {item.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={'w-1/3'}>
          <h4 className='capitalize font-bold my-2'>{t('usage-needs')}</h4>
          <div className={'flex gap-3 flex-wrap'}>
            {value.usages.map((item, index) => (
              <button
                key={index}
                value={item.value}
                onClick={() => toggleUsageSelection(item.value)} // Handle selection
                className={`p-2 flex flex-col gap-2 justify-center text-center bg-white border text-sm ${selectedUsages.includes(item.value) ? 'border-[#2f80ed]' : 'border-gray-300'} hover:border-[#2f80ed]`}
              >
                {item.value}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Divider sx={{ marginTop: '1rem' }} />
      <div className={'flex flex-wrap'}>
        {value.productAttributes?.map((item, index) => (
          <div className={'w-1/3 mb-3 pr-3'} key={index}>
            <h4 className='capitalize font-bold my-2'>{item.name}</h4>
            <div className={'flex gap-3 flex-wrap'}>
              {item.values.map((item, index) => (
                <button
                  key={index}
                  value={item}
                  onClick={() => toggleAttributesSelection(item)} // Handle selection
                  className={`p-2 bg-white border text-sm ${selectedAttributes.includes(item) ? 'border-[#2f80ed]' : 'border-gray-300'} hover:border-[#2f80ed]`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterModal;
