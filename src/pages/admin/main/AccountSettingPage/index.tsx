import { Header } from './components';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AccountSettingPage = () => {
  // const { personal } = useSelector((state: RootState) => state.personal);
  const { t } = useTranslation();

  return (
    <div
      className={
        'bg-[url("https://img.pikbest.com/wp/202344/blur-color-vividly-blurred-texture-background-in-full_9930529.jpg!sw800")]' +
        ' bg-no-repeat bg-cover'
      }
    >
      <Header />
      <div className={'px-20 pb-10'}>
        <div className={'backdrop-blur-sm bg-white/30 mt-24'}>
          <TextField size={'small'} label={t('full-name')} />
          <TextField size={'small'} label={t('phone')} />
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPage;
