import { useTranslation } from 'react-i18next';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { FilterModal } from '~/components/Filter/components';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Brand, ProductAttribute, Type, UsageNeed } from '~/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { toggleSelection } from '~/utils/array';

interface FilterProps {
  value: {
    brands: Brand[];
    types: Type[];
    usages: UsageNeed[];
    productAttributes: ProductAttribute[];
  } | null;
  filter: string[];
  setFilter: Dispatch<SetStateAction<string[]>>;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter, value }) => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const handleRemoveFilter = (item: string) => {
    setFilter((prev) => prev.filter((f) => f !== item));
  };

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

  const toggleFilterSelection = (filter: string) => {
    setFilter((prevSelected) => toggleSelection(prevSelected, filter));
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className={'flex gap-3 flex-wrap'}>
        {filter?.map((item, index) => (
          <button value={item} key={index} className='p-2 hover:border-[#4a90e2] hover:text-[#4a90e2] text-[13px]'>
            <span>{item}</span>
            <FontAwesomeIcon
              className={'text-gray-500 ml-2 hover:text-[red]'}
              onClick={() => handleRemoveFilter(item)}
              icon={faClose}
            />
          </button>
        ))}
      </div>
      <div className={'relative flex gap-3'}>
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
            value={value}
            isVisible={isFilterVisible}
            onClose={() => setFilterVisible(false)}
            position={modalPosition}
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        <div className={`flex gap-2 ${isFilterVisible ? 'pointer-events-none opacity-30' : ''}`}>
          {value.brands.map((item, index) => (
            <button
              value={item.name}
              onClick={() => toggleFilterSelection(item.name)}
              key={index}
              className={`p-2 hover:border-[#4a90e2] ${filter.includes(item.name) ? 'border-[#2f80ed]' : 'border-gray-300'}`}
            >
              <img className='h-5' alt={item.name} src={item.img} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
