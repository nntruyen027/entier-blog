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

export interface Item {
  name: string;
  img: string;
  originalPrice: number | null | undefined;
  price: number;
  gift: string;
  rating: number;
  url: string;
  labels: Label[];
  compares: Label[];
}

export interface Label {
  color: string;
  bg: string;
  content: string;
}

export interface ShortNew {
  title: string;
  img: string;
  url: string;
}
