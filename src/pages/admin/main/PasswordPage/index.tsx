import { Header } from './components';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { updatePassSelfStart } from '~/redux/auth/slice';

const AccountSettingPage = () => {
  const { personal } = useSelector((state: RootState) => state.personal);
  const { t } = useTranslation();
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleOnSave = () => {
    if (newpass !== confirmNewPass) {
      setError(t('passwords-do-not-match')); // Assume translation key for "Passwords do not match"
      return;
    }
    setError('');
    dispatch(updatePassSelfStart({ oldpass, newpass }));
  };

  const toggleShowOldPass = () => setShowOldPass((prev) => !prev);
  const toggleShowNewPass = () => setShowNewPass((prev) => !prev);
  const toggleShowConfirmNewPass = () => setShowConfirmNewPass((prev) => !prev);

  return (
    <div
      className={
        'bg-[url("https://img.pikbest.com/wp/202344/blur-color-vividly-blurred-texture-background-in-full_9930529.jpg!sw800")]' +
        ' bg-no-repeat bg-cover h-full'
      }
    >
      <Header />
      <div className={'px-20 mt-12 pb-10 text-center flex flex-col items-center'}>
        <div className={'backdrop-blur-sm bg-white/30 mt-24 w-1/2 flex flex-col gap-3 p-6 rounded-lg'}>
          <TextField
            size={'small'}
            label={t('old-pass')}
            value={oldpass}
            onChange={(e) => setOldpass(e.target.value)}
            type={showOldPass ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={toggleShowOldPass} edge='end'>
                    {showOldPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            size={'small'}
            label={t('new-pass')}
            value={newpass}
            onChange={(e) => setNewpass(e.target.value)}
            type={showNewPass ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={toggleShowNewPass} edge='end'>
                    {showNewPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            size={'small'}
            label={t('confirm-new-pass')}
            value={confirmNewPass}
            onChange={(e) => setConfirmNewPass(e.target.value)}
            type={showConfirmNewPass ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={toggleShowConfirmNewPass} edge='end'>
                    {showConfirmNewPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={!!error}
            helperText={error}
          />
          <Button variant={'outlined'} onClick={handleOnSave}>
            {t('save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPage;
