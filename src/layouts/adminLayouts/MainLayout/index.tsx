import { LayoutProps } from '~/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSelfStart } from '~/redux/auth/slice';
import { routes } from '~/config';
import { Sidebar } from '~/components';

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isLogin } = useSelector((state: RootState) => state.auth);
  const nav = useNavigate();
  const [isFullSiderbar, setIsFullSidebar] = useState(true);

  useEffect(() => {
    dispatch(getSelfStart());
  }, [dispatch, token]);

  useEffect(() => {
    if (!isLogin) {
      nav(routes.admin.auth.login);
    }
  }, [dispatch, isLogin]);

  const render = () => (
    <div className='w-full min-h-screen bg-[#f2f4f7] pb-3 flex'>
      <Sidebar isFull={isFullSiderbar} />
      <div className={'px-40 pt-28'}>{children}</div>
    </div>
  );

  return render();
};

export default MainLayout;
