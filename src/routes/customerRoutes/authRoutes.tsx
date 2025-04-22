import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { routes } from '~/config';
import { LoginCustomerPage } from '~/pages';

const authRoutes: Route[] = [
  {
    id: `admin-auth-${uuid4()}`,
    path: routes.customer.auth.login,
    element: <LoginCustomerPage />
  }
];

export default authRoutes;
