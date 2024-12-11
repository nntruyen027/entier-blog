import { MenuItemType } from '~/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';

const sidebar: MenuItemType[] = [
  {
    id: `sidebar-${uuid()}`,
    label: 'Dashboard',
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    hasChildren: true,
    children: [
      {
        id: `sidebar-${uuid()}`,
        label: 'Dashboard',
        route: '/admin',
        icon: <FontAwesomeIcon icon={faChartSimple} />,
        hasChildren: false
      }
    ]
  }
];

export default sidebar;
