import { MenuItemType } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { routes } from '~/config';

const menu: MenuItemType[] = [
  {
    hasChildren: false,
    label: 'Trang chủ',
    id: `menu-${uuid4()}`,
    route: routes.customer.home.home
  },
  {
    hasChildren: false,
    label: 'Về chúng tôi',
    id: `menu-${uuid4()}`,
    route: routes.customer.home.aboutMe
  },
  {
    hasChildren: false,
    label: 'Bài viết',
    id: `menu-${uuid4()}`,
    route: routes.customer.home.news
  },
  {
    hasChildren: true,
    label: 'Dịch vụ',
    id: `menu-${uuid4()}`,
    children: [
      {
        hasChildren: false,
        label: 'Sản phẩm',
        id: `menu-${uuid4()}`,
        route: routes.customer.home.products
      },
      {
        hasChildren: false,
        label: 'Đặt hàng',
        id: `menu-${uuid4()}`,
        route: routes.customer.home.service
      }
    ]
  }
];

export default menu;
