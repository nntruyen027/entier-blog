import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { routes } from '~/config';
import { LoginPage } from '~/pages';

const authRoutes: Route[] = [
  {
    id: `admin-auth-${uuid4()}`,
    path: routes.admin.auth.login,
    element: <LoginPage />
  }
];

export default authRoutes;
