import { MenuItemType } from '~/types';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { menu } from '~/config';
import { Helmet } from 'react-helmet';
import { getParamByKey } from '~/redux/param/api';
import { Layout, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import useParamValue from '~/hooks/useParamValue';
import './index.css';

const { Header, Content, Footer } = Layout;
const { SubMenu, Item } = Menu;

const HomeLayout = ({ children, title }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [logo, setLogo] = useState('');
  const { value: logoParam } = useParamValue('logo');
  const [name, setName] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false); // Trạng thái ẩn header khi cuộn

  useEffect(() => {
    if (logoParam) setLogo(logoParam);
  }, [logoParam]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const { value } = await getParamByKey('name');
        setName(value);
      } catch (err) {
        console.error('Lỗi khi lấy tên app:', err);
      }
    };
    fetchName();
  }, []);

  const selectedKeys = useMemo(() => {
    const flatRoutes = menu.flatMap((item) => (item.hasChildren ? item.children || [] : [item]));
    const match = flatRoutes.find((i) => i.route === location.pathname);
    return match ? [match.route] : [];
  }, [location.pathname]);

  // Lắng nghe sự kiện cuộn
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Cuộn xuống - ẩn header
        setIsHeaderHidden(true);
      } else {
        // Cuộn lên - hiện header
        setIsHeaderHidden(false);
      }
      lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY; // Đảm bảo không vượt quá 0
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderMenuItem = (item: MenuItemType) => {
    if (item.hasChildren && item.children?.length) {
      return (
        <SubMenu className={'font-medium'} key={item.id} icon={item.icon} title={t(item.label)}>
          {item.children.map((child) => renderMenuItem(child))}
        </SubMenu>
      );
    }

    return (
      <Item className={'font-medium'} key={item.route} icon={item.icon}>
        <Link to={item.route!}>{t(item.label)}</Link>
      </Item>
    );
  };

  return (
    <>
      <Helmet>
        <title>{`${title} | ${name}`}</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          className={`top-header h-20 ${isSticky ? 'sticky-header' : ''} ${isHeaderHidden ? 'header-hidden' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            padding: '0 24px',
            zIndex: 1,
            transition: 'all 0.3s ease' // Hiệu ứng cuộn mượt mà
          }}
        >
          <div
            className='logo flex gap-3 w-fit justify-center align-middle items-center'
            style={{
              fontWeight: 'bold',
              marginRight: 24,
              fontSize: 18,
              color: '#1890ff',
              whiteSpace: 'nowrap'
            }}
          >
            <img className='w-9 h-9' src={logo} alt='logo' />
            <span>{name}</span>
          </div>
          <Menu theme='light' mode='horizontal' selectedKeys={selectedKeys} style={{ flex: 1 }}>
            {menu.map((item) => renderMenuItem(item))}
          </Menu>
        </Header>
        <Content style={{ margin: '16px', overflow: 'auto' }}>{children}</Content>
        <Footer style={{ textAlign: 'center', background: 'transparent' }}>
          © {new Date().getFullYear()} {name}
        </Footer>
      </Layout>
    </>
  );
};

export default HomeLayout;
