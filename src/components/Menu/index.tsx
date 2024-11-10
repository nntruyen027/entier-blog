import { useState } from 'react';
import { MenuData, MenuItem as MenuItemType } from '~/types';
import { Link } from 'react-router-dom';
import './index.scss';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface MenuItemProps {
  item: MenuItemType;
}

const SubMenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [submenuPosition, setSubmenuPosition] = useState<{ left?: string; right?: string }>({ left: '0px' });

  const handleMouseEnter = () => {
    // Calculate position based on the menu item's screen position
    const menuItemElement = document.getElementById(`menu-item-${item.title}`);
    if (menuItemElement) {
      const rect = menuItemElement.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      // Set submenu position to left or right
      if (rect.left < screenWidth / 2) {
        setSubmenuPosition({ left: '0px', right: 'auto' });
      } else {
        setSubmenuPosition({ right: '0px', left: 'auto' });
      }
    }
  };

  return (
    <li
      id={`menu-item-${item.title}`}
      className='px-2 relative t-0 l-0 text-black hover:bg-[#fe9] cursor-pointer p-2 rounded-t-md sub-menu'
      onMouseEnter={handleMouseEnter}
    >
      {item.url ? (
        <Link to={item.url}>
          <span className='text-black text-sm'>
            <i className={`${item.icon} mr-2`}></i>
            {item.title}
          </span>
        </Link>
      ) : (
        <>
          <span className='text-black text-sm font-light'>
            <i className={`${item.icon} mr-2`}></i>
            {item.title}
            <FontAwesomeIcon className={'ml-2 icon'} icon={faAngleDown} />
          </span>
          <ul className='absolute top-9 max-w-7xl flex-wrap' style={submenuPosition}>
            <Paper className='w-full flex gap-3 p-2 paper'>
              {item.submenu.map((subitem: MenuItemType, index) => (
                <li key={index} className={'w-20 text-wrap hover:bg-[#f9fafb] py-4 px-1 rounded-xl'}>
                  <Link to={subitem.url}>
                    <img className={'m-auto'} src={subitem.icon} alt={subitem.title} width={'48px'} height={'48px'} />
                    <span className='text-black text-[12px] w-full'>{subitem.title}</span>
                  </Link>
                </li>
              ))}
            </Paper>
          </ul>
        </>
      )}
    </li>
  );
};

interface MenuProps {
  data: MenuData;
}

const Menu: React.FC<MenuProps> = ({ data }) => {
  return (
    <ul id='menu' className='bg-transparent px-4 text-white font-bold flex justify-between space-x-4'>
      {data.menu.map((item, index) => (
        <SubMenuItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default Menu;
