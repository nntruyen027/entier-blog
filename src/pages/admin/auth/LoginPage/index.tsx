import { Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { loginStart } from '~/redux/auth/slice';

const LoginPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const { token, account } = useSelector((state: RootState) => state.auth);
  console.log(token, account);

  const handleLogin = () => {
    dispatch(loginStart({ username, password }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin(); // Gọi hàm handleLogin khi người dùng nhấn Enter
    }
  };

  return (
    <div className={'flex justify-center'}>
      <div className={'w-1/3'} onKeyDown={handleKeyPress}>
        <Paper>
          <div className={'flex flex-col gap-10 p-10 text-[24px] font-bold '}>
            <div>{t('login')}</div>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label={t('username')}
              size={'small'}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={t('password')}
              size={'small'}
              type={'password'}
            />
            <button onClick={handleLogin} className={'bg-[#F96F3A] uppercase text-white text-[16px] font-light'}>
              {t('login')}
            </button>
          </div>
        </Paper>
        <div className={'flex justify-end mt-5'}>
          <span>{t('get-password-again')}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
