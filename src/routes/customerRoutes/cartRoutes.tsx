import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { CartPage } from '~/pages';
import { routes } from '~/config';

const cartRoutes: Route[] = [
  {
    id: `cart-${uuid4()}`,
    path: routes.customer.cart.index,
    element: <CartPage />
  }
];

export default cartRoutes;
