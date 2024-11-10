import { ReactNode } from 'react';

export interface Route {
  id: string;
  path: string;
  element: JSX.Element;
}

export interface LayoutProps {
  children: ReactNode;
}

// types.ts
export interface MenuItem {
  title: string;
  url?: string;
  icon?: string;
  submenu?: MenuItem[];
}

export interface MenuData {
  menu: MenuItem[];
}
