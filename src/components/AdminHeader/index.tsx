import Profile from './components/Profile';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '~/components';

interface AdminHeaderProps {
  title?: string;
  className?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, className }) => {
  const { t } = useTranslation();

  return (
    <div className={'w-full p-3 bg-white shadow-lg flex justify-between items-center' + ' ' + className}>
      <div className={'font-bold text-xl'}>{t(title)}</div>
      <div className={'flex gap-2 items-center'}>
        <Profile />
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default AdminHeader;
