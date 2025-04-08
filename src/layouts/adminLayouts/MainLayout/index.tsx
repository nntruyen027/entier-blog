import { LayoutProps } from '~/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSelfStart } from '~/redux/auth/slice';
import { routes } from '~/config';
import { Sidebar } from '~/components';
import AdminHeader from '~/components/AdminHeader';

const MainLayout: React.FC<LayoutProps> = ({ children, title }) => {
  const dispatch = useDispatch();
  const { token, isLogin } = useSelector((state: RootState) => state.auth);
  const nav = useNavigate();
  const [isFullSiderbar] = useState(true);

  useEffect(() => {
    dispatch(getSelfStart());
  }, [dispatch, token]);

  useEffect(() => {
    if (!isLogin) {
      nav(routes.admin.auth.login);
    }
  }, [dispatch, isLogin]);

  const render = () => (
    <div className='w-full h-screen bg-[#f2f4f7] flex overflow-hidden'>
      <Sidebar isFull={isFullSiderbar} />
      <div className={'w-full min-h-screen flex flex-col'}>
        <AdminHeader title={title} className={'flex-none'} />
        <div className={'w-full flex-1 overflow-auto p-1 pt-5'}>{children}</div>
      </div>
    </div>
  );

  return render();
};

export default MainLayout;
