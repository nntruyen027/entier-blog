import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Đóng dropdown sau khi chọn ngôn ngữ.
  };

  return (
    <div id='language-switcher' className='relative w-34'>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='border border-gray-300 rounded-lg px-4 py-2 bg-white flex items-center cursor-pointer'
      >
        <img
          src={
            i18n.language === 'en'
              ? 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
              : 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg'
          }
          alt={i18n.language === 'en' ? 'English' : 'Tiếng Việt'}
          className='flag-icon mr-2'
          width={20}
        />
        <span>{i18n.language === 'en' ? 'English' : 'Tiếng Việt'}</span>
      </div>

      {isOpen && (
        <div className='absolute top-full right-0 w-32 bg-white border border-gray-300 rounded-lg mt-2 z-10'>
          <div
            onClick={() => handleChangeLanguage('en')}
            className='flex items-center p-2 cursor-pointer hover:bg-gray-100'
          >
            <img
              src='https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
              alt='English'
              className='flag-icon mr-3'
              width={25}
            />
            <span>English</span>
          </div>
          <div
            onClick={() => handleChangeLanguage('vi')}
            className='flex items-center p-2 cursor-pointer hover:bg-gray-100'
          >
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg'
              alt='Tiếng Việt'
              className='flag-icon mr-3'
              width={25}
            />
            <span>Tiếng Việt</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
