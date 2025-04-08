import { MenuItemType } from '~/types';
import { v4 as uuid4 } from 'uuid';
import { admin } from '~/config/routes';
import { AppstoreOutlined } from '@ant-design/icons';

const sidebar: MenuItemType[] = [
  {
    icon: <AppstoreOutlined />,
    children: [
      {
        id: `sidebar-${uuid4()}`,
        icon: null,
        label: 'Thẻ',
        hasChildren: false,
        route: admin.main.tag
      }
    ],
    hasChildren: true,
    label: 'Danh mục',
    id: `sidebar-${uuid4()}`
  }
];

export default sidebar;
