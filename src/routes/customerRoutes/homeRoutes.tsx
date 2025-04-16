import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { ContentPage, HomePage, PostDetailPage } from '~/pages';
import { routes } from '~/config';

const routesConfig: Route[] = [
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.home,
    element: <HomePage />,
    label: 'Trang chủ'
  },
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.news,
    element: <ContentPage />,
    label: 'Bài viết'
  },
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.newsDetail,
    element: <PostDetailPage />,
    label: 'Chi tiết bài viết'
  }
];

export default routesConfig;
