import React from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/auth/slice';
import { RootState } from '~/redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '~/config';

const Profile: React.FC = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      dispatch(logout());
    } else if (e.key === 'profile') {
      if (account?.roles?.some((role) => role?.roleName?.includes('admin'))) {
        if (location.pathname.includes('admin')) nav(routes.admin.main.profile);
        else nav(routes.customer.home.profile);
      } else {
        nav(routes.customer.home.profile);
      }
    } else {
      if (location?.pathname?.includes('admin')) {
        nav(routes.customer.home.index);
      } else {
        nav(routes.admin.main.index);
      }
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Trang cá nhân'
    },
    ...(account?.roles?.some((role) => role?.roleName?.includes('admin'))
      ? [
          {
            key: 'switch',
            label: !location.pathname.includes('admin') ? 'Quản trị viên' : 'Blog'
          }
        ]
      : []),
    {
      key: 'logout',
      label: 'Đăng xuất'
    }
  ];
  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <Button size='small' style={{ marginLeft: '8px' }} type='link'>
        <Avatar src={account?.avatar} />
        <span style={{ fontWeight: 'bold' }}>{account?.fullName}</span>
      </Button>
    </Dropdown>
  );
};

export default Profile;
