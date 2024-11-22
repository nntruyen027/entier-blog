import { v4 as uuid4 } from 'uuid';
import { routes } from '~/config';
import { HomePage, ProductTypePage } from '~/pages';
import { Route } from '~/types';

const routesConfig: Route[] = [
  {
    id: `customer-${uuid4()}`,
    path: routes.customer.home.index,
    element: <HomePage />
  },
  {
    id: `customer-${uuid4()}`,
    path: routes.customer.home.home,
    element: <HomePage />
  },
  {
    id: `customer-${uuid4()}`,
    path: routes.customer.home.productType,
    element: <ProductTypePage />
  }
];

export default routesConfig;
