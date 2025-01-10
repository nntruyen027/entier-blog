import { MenuItemType } from '~/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faChartSimple, faIcons } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import { main } from '~/config/routes/admin';

const sidebar: MenuItemType[] = [
  {
    id: `sidebar-${uuid()}`,
    label: 'dashboard',
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    hasChildren: true,
    children: [
      {
        id: `sidebar-${uuid()}`,
        label: 'dashboard',
        route: main.index,
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      }
    ]
  },
  {
    id: `sidebar-${uuid()}`,
    label: 'system-management',
    icon: <FontAwesomeIcon icon={faBarsProgress} />,
    hasChildren: true,
    children: [
      {
        id: `sidebar-${uuid()}`,
        label: 'role',
        route: main.role,
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      },
      {
        id: `sidebar-${uuid()}`,
        label: 'user',
        route: main.user,
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      }
    ]
  },
  {
    id: `sidebar-${uuid()}`,
    label: 'category-management',
    icon: <FontAwesomeIcon icon={faIcons} />,
    hasChildren: true,
    children: [
      {
        id: `sidebar-${uuid()}`,
        label: 'product-type',
        route: main.productType,
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      },
      {
        id: `sidebar-${uuid()}`,
        label: 'tag',
        route: main.tag,
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      },
      {
        id: `sidebar-${uuid()}`,
        label: 'brand',
        route: main.brand,
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      }
    ]
  }
];

export default sidebar;
