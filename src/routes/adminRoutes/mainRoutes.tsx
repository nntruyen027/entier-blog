import { Route } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { ParamPage, PostPage, RolePage, TagPage, UserPage } from '~/pages';
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
    path: routes.admin.main.role,
    element: <RolePage />,
    label: 'Quyền'
  },
  {
    id: `admin-main-${uuid4()}`,
    path: routes.admin.main.post,
    element: <PostPage />,
    label: 'Bài viết'
  }
];

export default mainRoutes;
