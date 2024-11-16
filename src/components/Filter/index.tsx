import { useTranslation } from 'react-i18next';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Brand, Type, UsageNeed } from '~/types';
import { FilterModal } from '~/components/Filter/components';
import { useRef, useState } from 'react';

const brands: Brand[] = [
  {
    name: 'samsung',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/31/ce/31ce9dafafac121361ee7cbd313ae76b.png'
  },
  {
    name: 'iPhone',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/92/e5/92e5003382a0bada9a770618b6c6099b.png'
  },
  {
    name: 'oppo',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/b6/26/b62674c18cc7ec4de1de3670812af13d.png'
  },
  {
    name: 'xiaomi',
    img: 'https://cdnv2.tgdd.vn/mwg-static/common/Category/e6/02/e602583e5e16acedfe54ab41b08b5d4f.png'
  }
];

const types: Type[] = [
  {
    name: 'Android',
    img: 'https://cdn.tgdd.vn/ValueIcons/android.jpg'
  },
  {
    name: 'iphone (iOS)',
    img: 'https://cdn.tgdd.vn/ValueIcons/iphone.jpg'
  },
  {
    name: 'Khác',
    img: 'https://cdn.tgdd.vn/ValueIcons/dien-thoai-pho-thong.jpg'
  }
];

const usages: UsageNeed[] = [
  {
    value: 'Chơi game khủng / Cấu hình cao'
  },
  {
    value: 'Pin khủng trên 5000 mAh'
  },
  {
    value: 'Chụp ảnh, quay phim'
  },
  {
    value: 'Livestream'
  },
  {
    value: 'Mỏng nhẹ'
  }
];

const Filter = () => {
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
          <span>{t('filter')}</span>
        </button>
        <FilterModal
          value={{ brands, types, usages }}
          isVisible={isFilterVisible}
          onClose={() => setFilterVisible(false)}
          position={modalPosition}
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
