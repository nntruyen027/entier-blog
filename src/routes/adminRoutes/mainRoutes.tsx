import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { routes } from '~/config';
import {
  AccountSettingPage,
  DashboardPage,
  PasswordPage,
  ProductTypeAdminPage,
  RolePage,
  TagPage,
  UserManagementPage
} from '~/pages';

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
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.passwordSetting,
    element: <PasswordPage />,
    label: 'password'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.role,
    element: <RolePage />,
    label: 'role-management'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.user,
    element: <UserManagementPage />,
    label: 'user-management'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.productType,
    element: <ProductTypeAdminPage />,
    label: 'product-type'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.tag,
    element: <TagPage />,
    label: 'tag'
  }
];

export default authRoutes;
