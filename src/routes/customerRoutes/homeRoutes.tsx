import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { HomePage } from '~/pages';

const routesConfig: Route[] = [
  {
    id: `home-main-${uuid4()}`,
    path: '/',
    element: <HomePage />,
    label: 'Trang chủ'
  }
];

export default routesConfig;
