import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/auth/slice';
import { RootState } from '~/redux/store';

const Profile: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { account } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      dispatch(logout());
      setVisible(false);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='logout' icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown
        overlay={menu}
        visible={visible}
        onVisibleChange={setVisible}
        trigger={['click']}
        placement='bottomRight'
      >
        <Button size='small' style={{ marginLeft: '8px' }} type='link'>
          <span style={{ fontWeight: 'bold' }}>{account?.fullName}</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default Profile;
