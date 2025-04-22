import React, { useState } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/auth/slice';
import { RootState } from '~/redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '~/config';

const Profile: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { account } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      dispatch(logout());
      setVisible(false);
    }
    if (location.pathname.includes('admin')) {
      nav(routes.customer.home.index);
    } else {
      nav(routes.admin.main.index);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {account.roles.some((role) => role.roleName.includes('admin')) && (
        <Menu.Item key='switch' icon={<UserSwitchOutlined />}>
          {location.pathname.includes('admin') ? 'Quản trị viên' : 'Blog'}
        </Menu.Item>
      )}
      <Menu.Item key='logout' icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} visible={visible} onVisibleChange={setVisible} trigger={['click']} placement='bottomRight'>
      <Button size='small' style={{ marginLeft: '8px' }} type='link'>
        <Avatar src={account.avatar} />
        <span style={{ fontWeight: 'bold' }}>{account?.fullName}</span>
      </Button>
    </Dropdown>
  );
};

export default Profile;
