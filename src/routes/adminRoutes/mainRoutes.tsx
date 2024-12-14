import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { routes } from '~/config';
import { AccountSettingPage, DashboardPage } from '~/pages';

const authRoutes: Route[] = [
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.index,
    element: <DashboardPage />,
    label: 'dashboard'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.accountSetting,
    element: <AccountSettingPage />,
    label: 'personal-setting'
  }
];

export default authRoutes;
