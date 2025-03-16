import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { routes } from '~/config';
import {
  AccountSettingPage,
  AttributePage,
  AttributeTypePage,
  AttributeValuePage,
  BrandPage,
  DashboardPage,
  PasswordPage,
  ProductPage,
  ProductTypeAdminPage,
  ProductVersionPage,
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
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.brand,
    element: <BrandPage />,
    label: 'brand'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.attributeType,
    element: <AttributeTypePage />,
    label: 'attribute-type'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.attribute,
    element: <AttributePage />,
    label: 'attribute'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.attributeValue,
    element: <AttributeValuePage />,
    label: 'attribute'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.product,
    element: <ProductPage />,
    label: 'product'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.productVersion,
    element: <ProductVersionPage />,
    label: 'product-version'
  }
];

export default authRoutes;
