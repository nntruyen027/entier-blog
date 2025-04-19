import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { ContactTypePage, ParamPage, PostPage, ProductTypePage, RolePage, TagPage, UserPage } from '~/pages';
import { ContactPage, ProductPage } from '~/pages/admin';
import { routes } from '~/config';

const mainRoutes: Route[] = [
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.tag,
    element: <TagPage />,
    label: 'Thẻ'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.contactType,
    element: <ContactTypePage />,
    label: 'Loại liên hệ'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.param,
    element: <ParamPage />,
    label: 'Tham số'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.user,
    element: <UserPage />,
    label: 'Người dùng'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.index,
    element: <UserPage />,
    label: 'Người dùng'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.role,
    element: <RolePage />,
    label: 'Quyền'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.post,
    element: <PostPage />,
    label: 'Bài viết'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.contact,
    element: <ContactPage />,
    label: 'Liên hệ'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.product,
    element: <ProductPage />,
    label: 'Sản phẩm'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.productType,
    element: <ProductTypePage />,
    label: 'Loại sản phẩm'
  }
];

export default mainRoutes;
