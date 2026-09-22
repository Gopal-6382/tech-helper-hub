import { IconName } from "@/frontend/components/common/icon";

interface NavSubItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: IconName;
  children?: NavSubItem[];
}
