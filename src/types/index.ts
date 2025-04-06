import React, { ReactNode } from 'react';

export interface Route {
  id: string;
  path: string;
  element: JSX.Element;
  label?: string;
}

export interface LayoutProps {
  children: ReactNode;
  title?: string;
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

export interface Location {
  id: string;
  name: string;
}

export interface Address {
  province: Location;
  district: Location;
  ward: Location;
  detail: string;
}

export interface Consignee {
  name: string;
  address: Address;
  phone: string;
  isMale: boolean;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface MenuItemType {
  id: string | number;
  label: string;
  route?: string;
  icon?: JSX.Element;
  hasChildren: boolean;
  children?: MenuItemType[];
}

export interface RowAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (row, table?) => void;
}

export interface ItemType {
  id: number;
  name: string;
}
