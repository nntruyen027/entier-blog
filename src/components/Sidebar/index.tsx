import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '~/config';
import './siderbar.scss';

interface SidebarProps {
  isFull: boolean;
}

const CustomSidebar: React.FC<SidebarProps> = ({ isFull }) => {
  const location = useLocation();

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
        {sidebar.map((item, index) => {
          const isSubMenuActive = item.hasChildren && item.children?.some((sub) => sub.route === location.pathname); // Kiểm tra nếu SubMenu có bất kỳ route nào active

          return item.hasChildren ? (
            <SubMenu
              label={item.label}
              icon={item.icon}
              key={index}
              defaultOpen={isSubMenuActive}
              active={isSubMenuActive}
            >
              {item?.children?.map((sub) => (
                <MenuItem active={sub.route === location.pathname} key={sub.route}>
                  {sub.label}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              active={item.route === location.pathname}
              component={<Link to={item.route} />}
              icon={item.icon}
              key={item.route}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
