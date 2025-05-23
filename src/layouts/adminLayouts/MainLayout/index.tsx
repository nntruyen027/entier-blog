import { LayoutProps } from '~/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSelfStart } from '~/redux/auth/slice';
import { routes } from '~/config';
import { Sidebar } from '~/components';
import AdminHeader from '~/components/AdminHeader';
import { Helmet } from 'react-helmet';
import { getParamByKey } from '~/redux/param/api';
import { Layout } from 'antd';

const { Content, Footer, Sider } = Layout;

const MainLayout: React.FC<LayoutProps> = ({ children, title }) => {
  const dispatch = useDispatch();
  const { token, isLogin } = useSelector((state: RootState) => state.auth);
  const nav = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState('');

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

  useEffect(() => {
    dispatch(getSelfStart());
  }, [dispatch, token]);

  useEffect(() => {
    if (!isLogin) {
      nav(routes.admin.auth.login);
    }
  }, [dispatch, isLogin]);

  return (
    <>
      <Helmet>
        <title>{`${title} | ${name}`}</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme='light'
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={240}
          style={{ position: 'fixed', height: '100vh', zIndex: 1000, left: 0 }}
        >
          <Sidebar isFull={!collapsed} />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 240,
            transition: 'margin-left 0.2s',
            minHeight: '100vh'
          }}
        >
          <AdminHeader title={title} />

          <Content
            style={{
              padding: '24px',
              marginTop: 0,
              overflow: 'auto',
              flex: 1,
              background: '#f9f9f9'
            }}
          >
            {children}
          </Content>

          <Footer style={{ textAlign: 'center', background: 'transparent' }}>
            © {new Date().getFullYear()} {name}
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
