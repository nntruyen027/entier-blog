import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '~/config';
import './siderbar.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import useParamValue from '~/hooks/useParamValue';

interface SidebarProps {
  isFull: boolean;
}

const { SubMenu } = Menu;

const CustomSidebar: React.FC<SidebarProps> = ({ isFull }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [logo, setLogo] = useState('');
  const [name, setName] = useState('');
  const { value: logoParam } = useParamValue('logo');
  const { value: nameParam } = useParamValue('name');

  useEffect(() => {
    if (logoParam) setLogo(logoParam);
    if (nameParam) setName(nameParam);
  }, [logoParam, nameParam]);

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
      <div className='logo-wrapper  demo-logo-vertical'>
        <img className='logo' src={logo} alt='logo' />
      </div>
      <Menu
        mode='inline'
        theme='light'
        inlineCollapsed={!isFull}
        selectedKeys={selectedKeys}
        defaultOpenKeys={isFull ? openKeys : []}
        style={{ borderRight: 0 }}
      >
        {sidebar.map((item) =>
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
