import { useState } from 'react';
import { MenuData, MenuItem as MenuItemType } from '~/types';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

interface MenuItemProps {
  item: MenuItemType;
}

const SubMenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [submenuPosition, setSubmenuPosition] = useState<{ left?: string; right?: string }>({ left: '0px' });

  const handleMouseEnter = () => {
    const menuItemElement = document.getElementById(`menu-item-${item.title}`);
    if (menuItemElement) {
      const rect = menuItemElement.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (rect.left < screenWidth / 2) {
        setSubmenuPosition({ left: '0px', right: 'auto' });
      } else {
        setSubmenuPosition({ right: '0px', left: 'auto' });
      }
    }
  };

  const menu = (
    <Menu>
      {item.submenu.map((subitem: MenuItemType, index) => (
        <Menu.Item key={index}>
          <Link to={subitem.url}>
            <img className={'m-auto'} src={subitem.icon} alt={subitem.title} width={'48px'} height={'48px'} />
            <span className='text-black text-[12px] w-full'>{subitem.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <li
      id={`menu-item-${item.title}`}
      className='px-2 relative text-black hover:bg-[#fe9] cursor-pointer p-2 rounded-t-md sub-menu'
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
          <Dropdown overlay={menu} trigger={['click']} placement='bottomLeft'>
            <Button type='link' className='p-0'></Button>
          </Dropdown>
        </>
      )}
    </li>
  );
};

interface MenuProps {
  data: MenuData;
}

const CustomMenu: React.FC<MenuProps> = ({ data }) => {
  return (
    <ul id='menu' className='bg-transparent px-4 text-white font-bold flex justify-between space-x-4'>
      {data.menu.map((item, index) => (
        <SubMenuItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default CustomMenu;
