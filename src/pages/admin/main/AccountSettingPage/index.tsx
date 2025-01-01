import { Header } from './components';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { getStart, updateStart } from '~/redux/personal/slice';

const AccountSettingPage = () => {
  const { personal } = useSelector((state: RootState) => state.personal);
  const { t } = useTranslation();
  const [isMale, setIsMale] = useState(personal?.male ?? true); // Use nullish coalescing to preserve `false`.
  const [fullName, setFullName] = useState(personal?.fullName || '');
  const [phone, setPhone] = useState(personal?.phone || '');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStart());
  }, [dispatch]);

  const handleOnSave = () => {
    dispatch(updateStart({ fullName, phone, isMale }));
  };

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
            label={t('full-name')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField size={'small'} label={t('phone')} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField size={'small'} label={t('email')} value={personal?.email || ''} disabled />
          <FormControl
            fullWidth
            size={'small'}
            sx={{
              textAlign: 'left'
            }}
          >
            <FormLabel id='demo-row-radio-buttons-group-label'>{t('gender')}</FormLabel>
            <RadioGroup
              onChange={(e) => setIsMale(e.target.value == 'true')}
              value={isMale.toString()} // Convert boolean to string
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              sx={{
                display: 'flex',
                justifyContent: 'left',
                gap: '3rem'
              }}
            >
              <FormControlLabel value={'false'} control={<Radio />} label={t('female')} />
              <FormControlLabel value={'true'} control={<Radio />} label={t('male')} />
            </RadioGroup>
          </FormControl>
          <Button variant={'outlined'} onClick={handleOnSave}>
            {t('save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPage;
