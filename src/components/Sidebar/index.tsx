import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '~/config';
import './siderbar.scss';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isFull: boolean;
}

const CustomSidebar: React.FC<SidebarProps> = ({ isFull }) => {
  const location = useLocation();
  const { t } = useTranslation();
  console.log(sidebar);

  return (
    <Sidebar collapsed={!isFull} id={'admin-sidebar'}>
      <Menu
        transitionDuration={500}
        menuItemStyles={{
          label: {
            textAlign: 'left'
          }
        }}
      >
        <div className={'p-6'}>
          <img src={'https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/noel/2024/tgdd/logo-dt.png'} alt={'logo'} />
        </div>
        {sidebar.map((item, index) => {
          const isSubMenuActive = item.hasChildren && item.children?.some((sub) => sub.route === location.pathname); // Kiểm tra nếu SubMenu có bất kỳ route nào active
          return item.hasChildren ? (
            <SubMenu
              label={t(item.label)}
              icon={item.icon}
              key={index}
              defaultOpen={isSubMenuActive}
              active={isSubMenuActive}
            >
              {item?.children?.map((sub, index) => (
                <MenuItem component={<Link to={sub.route} />} active={sub.route === location.pathname} key={index}>
                  {t(sub.label)}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              active={item.route === location.pathname}
              component={<Link to={item.route} />}
              icon={item.icon}
              key={index}
            >
              {t(item.label)}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
