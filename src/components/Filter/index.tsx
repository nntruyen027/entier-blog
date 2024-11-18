import { useTranslation } from 'react-i18next';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { FilterModal } from '~/components/Filter/components';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { brands, types, usages } from '~/data/fake.js';
import { ProductAttribute } from '~/types';

interface FilterProps {
  productAttributes: ProductAttribute[];
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
}

const Filter: React.FC<FilterProps> = ({ productAttributes, filter, setFilter }) => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const openFilterModal = () => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.height + 10,
        left: 0
      });
    }
    setFilterVisible(true);
  };

  return (
    <div className='relative flex gap-3'>
      {isFilterVisible && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={() => setFilterVisible(false)} />
      )}
      <div className='relative z-50 top-0 left-0'>
        <button
          ref={filterButtonRef}
          className={
            'flex flex-row bg-white border-[#e0e0e0] hover:outline-none hover:border-[#e0e0e0] hover:bg-[#f9fafb] p-2 active:outline-none focus:outline-none'
          }
          onClick={openFilterModal}
        >
          <FilterAltOutlinedIcon />
          <span className={'capitalize'}>{t('filter')}</span>
        </button>
        <FilterModal
          value={{ brands, types, usages, productAttributes }}
          isVisible={isFilterVisible}
          onClose={() => setFilterVisible(false)}
          position={modalPosition}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <div className={`flex gap-2 ${isFilterVisible ? 'pointer-events-none opacity-30' : ''}`}>
        {brands.map((item, index) => (
          <button value={item.name} key={index} className='p-2 focus:outline-none'>
            <img className='h-5' alt={item.name} src={item.img} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
