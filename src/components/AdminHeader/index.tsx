import { useLocation } from 'react-router-dom';
import { sidebar } from '~/config';
import Profile from './components/Profile';

const AdminHeader = () => {
  const location = useLocation();
  const findCurrentLocation = (items: typeof sidebar, path: string) => {
    for (const item of items) {
      if (item.route === path) {
        return item;
      }

      if (item.hasChildren && item.children) {
        const found = findCurrentLocation(item.children, path);
        if (found) {
          return found;
        }
      }
    }

    return '';
  };

  const currentLocation = findCurrentLocation(sidebar, location.pathname);
  return (
    <div className={'w-full p-3 bg-white shadow-lg flex justify-between'}>
      <div className={'font-bold text-xl'}>{currentLocation.label}</div>
      <Profile />
    </div>
  );
};

export default AdminHeader;
