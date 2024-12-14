import { ReactNode } from 'react';

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
  version: VersionProduct[];
}

export interface VersionProduct {
  name: string;
  image: string;
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

export interface ProductAttribute {
  product: string;
  name: string;
  values: string[];
}

export interface Type {
  name: string;
  img: string;
}

export interface UsageNeed {
  value: string;
}

export interface Brand {
  name: string;
  img: string;
}

export interface Province {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  provinceId: string;
}

export interface Ward {
  id: string;
  name: string;
  districtId: string;
}

export interface FullData {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
}

export interface LocationState {
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  fullData: FullData | null;
  selectedLocation: Province | District | Ward | null;
  loading: boolean;
  error: string | null;
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

export interface CartItem {
  product: Item;
  version: VersionProduct;
  quantity: number;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface MenuItemType {
  id: string | number;
  label: string;
  route?: string;
  icon: JSX.Element;
  hasChildren: boolean;
  children?: MenuItemType[];
}
