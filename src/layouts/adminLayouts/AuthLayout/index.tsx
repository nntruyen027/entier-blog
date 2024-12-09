import { LayoutProps } from '~/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { getSelfStart } from '~/redux/auth/slice';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/config';

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isLogin } = useSelector((state: RootState) => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getSelfStart());
  }, [dispatch, token]);

  useEffect(() => {
    if (isLogin) {
      nav(routes.admin.auth.index);
    }
  }, [dispatch, token, isLogin]);

  const render = () => (
    <div className='w-full min-h-screen bg-[#f2f4f7] pb-3'>
      <div className={'px-40 pt-28'}>{children}</div>
    </div>
  );

  return render();
};

export default AuthLayout;
