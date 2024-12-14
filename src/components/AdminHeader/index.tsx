import Profile from './components/Profile';
import { useTranslation } from 'react-i18next';

interface AdminHeaderProps {
  title?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className={'w-full p-3 bg-white shadow-lg flex justify-between'}>
      <div className={'font-bold text-xl'}>{t(title)}</div>
      <Profile />
    </div>
  );
};

export default AdminHeader;
