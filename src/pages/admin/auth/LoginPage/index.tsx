import { Button, Card, Input } from 'antd'; // Thay vì Paper và TextField từ MUI
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

  const handleLogin = () => {
    dispatch(loginStart({ username, password }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={'flex justify-center'}>
      <div className={'w-1/3'} onKeyDown={handleKeyPress}>
        {/* Thay Paper thành Card của Ant Design */}
        <Card>
          <div className={'flex flex-col gap-10 p-10 text-[24px] font-bold'}>
            <div>{t('login')}</div>
            {/* Thay TextField thành Input từ Ant Design */}
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('username')}
              size='large'
            />
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('password')}
              size='large'
            />
            {/* Thay button HTML bằng Button của Ant Design */}
            <Button onClick={handleLogin} type='primary' style={{ backgroundColor: '#F96F3A', width: '100%' }}>
              {t('login')}
            </Button>
          </div>
        </Card>
        <div className={'flex justify-end mt-5'}>
          <span>{t('get-password-again')}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
