import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { TagPage } from '~/pages';
import { routes } from '~/config';

const mainRoutes: Route[] = [
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.tag,
    element: <TagPage />
  }
];

export default mainRoutes;
