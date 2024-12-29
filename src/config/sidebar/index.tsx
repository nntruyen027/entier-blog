import { MenuItemType } from '~/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
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
    icon: <FontAwesomeIcon icon={faChartSimple} />,
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
  }
];

export default sidebar;
