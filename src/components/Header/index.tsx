import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputAdornment, TextField } from '@mui/material';
import {
  ChevronRightOutlined,
  LocationOnOutlined,
  PersonOutlined,
  Search,
  ShoppingCartOutlined
} from '@mui/icons-material';
import { useAuth } from '~/contexts/authContext';
import { MenuData } from '~/types';
import Menu from '~/components/Menu';
import useEventListener from '~/hooks/useEventListener';
import { Link } from 'react-router-dom';
import { routes } from '~/config';

export const menuData: MenuData = {
  menu: [
    {
      title: 'Điện thoại',
      url: '/dien-thoai',
      icon: 'fa-solid fa-mobile-screen'
    },
    {
      title: 'Laptop',
      url: '/laptop',
      icon: 'fa-solid fa-laptop'
    },
    {
      title: 'Phụ kiện',
      icon: 'fa-solid fa-headphones',
      submenu: [
        {
          title: 'Tai nghe',
          url: '/phu-kien/tai-nghe',
          icon: 'https://cdn.tgdd.vn/content/may-cu-48x48.png'
        },
        {
          title: 'Ốp lưng',
          url: '/phu-kien/op-lung',
          icon: 'https://cdn.tgdd.vn/content/may-cu-48x48.png'
        }
      ]
    },
    {
      title: 'Dịch vụ tiện ích',
      icon: 'fa-solid fa-list-check',
      submenu: [
        {
          title: 'Đóng tiền trả góp',
          url: '/hoa-don/tra-gop',
          icon: 'https://cdn.tgdd.vn/content/may-cu-48x48.png'
        },
        {
          title: 'Đóng tiền điện',
          url: '/hoa-don/dien',
          icon: 'https://cdn.tgdd.vn/content/may-cu-48x48.png'
        },
        {
          title: 'Đóng tiền nước',
          url: '/hoa-don/nuoc',
          icon: 'https://cdn.tgdd.vn/content/may-cu-48x48.png'
        }
      ]
    }
  ]
};

const Header = () => {
  const [search, setSearch] = useState<string>('');
  const { t } = useTranslation();
  const { isAuthenticated, login, logout } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(true);

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
    lastScrollY = window.scrollY;
  };

  useEventListener('scroll', handleScroll);

  const render = () => {
    return (
      <div className='w-full pt-3 text-sm px-40 fixed bg-[#ffd400] z-[1001] top-0'>
        <div className='flex w-full gap-3 justify-between mb-3'>
          <div className={'w-full flex flex-1 gap-1'}>
            <Link to={'/'}>
              {' '}
              <img
                className='w-60 h-auto object-contain'
                src='https://cdn.haitrieu.com/wp-content/uploads/2021/11/Logo-The-Gioi-Di-Dong-MWG-B-H.png'
                alt='logo'
              />
            </Link>
            <div className={'w-full'}>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '50px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px', // Rounded corners
                    border: 'none', // No border
                    '& fieldset': {
                      border: 'none' // Removes default border
                    },
                    '&:hover fieldset': {
                      border: 'none' // Prevents border on hover
                    },
                    '&.Mui-focused fieldset': {
                      backgroundColor: 'transparent',
                      border: 'none' // Prevents border on focus
                    }
                  }
                }}
                fullWidth
                variant='outlined'
                size='small'
                placeholder={t('search')}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Search />
                    </InputAdornment>
                  ),
                  style: {
                    borderRadius: '50px',
                    border: 'none',
                    outline: 'none'
                  }
                }}
              />
            </div>
          </div>
          <div className={'w-full flex flex-1 gap-1'}>
            <button
              onClick={() => (isAuthenticated ? logout() : login())}
              className='flex items-center px-2 bg-[#ffd400] border-0 rounded-2xl hover:bg-[#fe9] hover:border-0 active:outline-none focus:outline-none focus:ring-0'
            >
              <PersonOutlined className='text-black' />
              <span className='text-black w-24 font-light uppercase'>{isAuthenticated ? 'N.Truyen' : t('login')}</span>
            </button>
            <Link to={routes.customer.cart.index}>
              <button className='flex items-center px-2 bg-[#ffd400] border-0 rounded-2xl hover:bg-[#fe9] hover:border-0 active:outline-none focus:outline-none focus:ring-0'>
                <ShoppingCartOutlined className='text-black' />
                <span className='text-black w-20 font-light first-letter:uppercase '>{t('cart')}</span>
              </button>
            </Link>
            <button className='flex items-center px-2 bg-[#ffe14c] border-0 rounded-2xl hover:bg-[#fe9] hover:border-0 active:border-[#fe9] active:outline-none focus:outline-none focus:ring-0 '>
              <div className={'flex start-0'}>
                <LocationOnOutlined className='text-black' />
                <span className='text-black text-start w-[250px] font-light first-letter:uppercase '>
                  {isAuthenticated ? 'my-address' : t('address')}
                </span>
              </div>
              <ChevronRightOutlined className={'text-black'} />
            </button>
          </div>
        </div>
        {showMenu && <Menu data={menuData} />}
      </div>
    );
  };

  return render();
};

export default Header;
