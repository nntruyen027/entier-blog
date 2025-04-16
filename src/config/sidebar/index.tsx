import { MenuItemType } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { admin } from '~/config/routes';
import { AppstoreOutlined, GlobalOutlined, ProductOutlined, SettingOutlined } from '@ant-design/icons';

const sidebar: MenuItemType[] = [
  {
    icon: <SettingOutlined />,
    children: [
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Người dùng',
        hasChildren: false,
        route: admin.main.user
      },
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Quyền',
        hasChildren: false,
        route: admin.main.role
      },
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Tham số',
        hasChildren: false,
        route: admin.main.param
      }
    ],
    hasChildren: true,
    label: 'Hệ thống',
    id: `sidebar-${uuid4()}`
  },
  {
    icon: <AppstoreOutlined />,
    children: [
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Thẻ',
        hasChildren: false,
        route: admin.main.tag
      },
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Loại liên hệ',
        hasChildren: false,
        route: admin.main.contactType
      },
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Loại sản phẩm',
        hasChildren: false,
        route: admin.main.productType
      }
    ],
    hasChildren: true,
    label: 'Danh mục',
    id: `sidebar-${uuid4()}`
  },
  {
    icon: <GlobalOutlined />,
    children: [
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Bài viết',
        hasChildren: false,
        route: admin.main.post
      },
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Liên hệ',
        hasChildren: false,
        route: admin.main.contact
      }
    ],
    hasChildren: true,
    label: 'Công khai',
    id: `sidebar-${uuid4()}`
  },
  {
    icon: <ProductOutlined />,
    children: [
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Sản phẩm',
        hasChildren: false,
        route: admin.main.product
      }
    ],
    hasChildren: true,
    label: 'Dịch vụ',
    id: `sidebar-${uuid4()}`
  }
];

export default sidebar;
