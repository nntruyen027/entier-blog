import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '~/config';
import './siderbar.scss';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

interface SidebarProps {
  isFull: boolean;
}

const { SubMenu } = Menu;

const CustomSidebar: React.FC<SidebarProps> = ({ isFull }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Memo hóa selectedKeys và openKeys
  const { selectedKeys, openKeys } = useMemo(() => {
    let selected: string[] = [];
    let open: string[] = [];

    sidebar.forEach((item) => {
      if (item.hasChildren) {
        item.children?.forEach((sub) => {
          if (sub.route === location.pathname) {
            selected = [sub.route];
            open = [item.label];
          }
        });
      } else {
        if (item.route === location.pathname) {
          selected = [item.route];
        }
      }
    });

    return { selectedKeys: selected, openKeys: open };
  }, [location.pathname]);

  return (
    <div className={`custom-sidebar ${isFull ? 'expanded' : 'collapsed'}`}>
      <div className='logo-wrapper'>
        <img className='logo' src='https://1000logos.net/wp-content/uploads/2020/08/Blogger-Logo-2010.png' alt='logo' />
      </div>
      <Menu
        mode='inline'
        inlineCollapsed={!isFull}
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        style={{ height: '100%', borderRight: 0 }}
      >
        {sidebar.map((item, index) =>
          item.hasChildren ? (
            <SubMenu key={item.label} icon={item.icon} title={t(item.label)}>
              {item.children?.map((sub) => (
                <Menu.Item key={sub.route} icon={sub.icon}>
                  <Link to={sub.route}>{t(sub.label)}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.route} icon={item.icon}>
              <Link to={item.route}>{t(item.label)}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </div>
  );
};

export default CustomSidebar;
