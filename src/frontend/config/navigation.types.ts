import { IconName } from "@/frontend/components/common/icon";

export interface NavSubItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: IconName;
  children?: NavSubItem[];
}
