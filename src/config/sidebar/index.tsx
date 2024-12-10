import { MenuItemType } from '~/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

const sidebar: MenuItemType[] = [
  {
    id: 1,
    label: 'Dashboard',
    route: '/admin/1  ',
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    hasChildren: false
  },
  {
    id: 1,
    label: 'Dashboard',
    route: '/admin/dashboard/1',
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    hasChildren: true,
    children: [
      {
        id: 1,
        label: 'Dashboard',
        route: '/admin',
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      },
      {
        id: 1,
        label: 'Dashboard',
        route: '/admin/dashboard/2',
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      }
    ]
  },
  {
    id: 1,
    label: 'Dashboard',
    route: '/admin/dashboard/3',
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    hasChildren: false
  }
];

export default sidebar;
