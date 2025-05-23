import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { AboutMePage, ContentPage, HomePage, PostDetailPage, ProductDetailPage, ProfileCustomerPage } from '~/pages';
import { ContactPage, ProductPage } from '~/pages/customer';
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
  },
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.products,
    element: <ProductPage />,
    label: 'Sản phẩm'
  },
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.productDetail,
    element: <ProductDetailPage />,
    label: 'Chi tiết sản phẩm'
  },
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.service,
    element: <ContactPage />,
    label: 'Dịch vụ'
  },
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.aboutMe,
    element: <AboutMePage />,
    label: 'About Me'
  },
  {
    id: `home-main-${uuid4()}`,
    path: routes.customer.home.profile,
    element: <ProfileCustomerPage />,
    label: 'Trang cá nhân'
  }
];

export default routesConfig;
