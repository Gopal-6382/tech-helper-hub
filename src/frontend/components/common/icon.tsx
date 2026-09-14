import React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  FolderTree,
  Wrench,
  FileText,
  MessageSquare,
  Users,
  Star,
  User,
  Settings,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LucideProps,
} from "lucide-react";

export type IconName =
  | "dashboard"
  | "bookings"
  | "categories"
  | "servicerequests"
  | "posts"
  | "chat"
  | "professionals"
  | "reviews"
  | "profile"
  | "settings"
  | "reports"
  | "chevronDown"
  | "chevronRight"
  | "menu"
  | "close";

const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
  dashboard: LayoutDashboard,
  bookings: CalendarCheck,
  categories: FolderTree,
  servicerequests: Wrench,
  posts: FileText,
  chat: MessageSquare,
  professionals: Users,
  reviews: Star,
  profile: User,
  settings: Settings,
  reports: AlertCircle,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  menu: Menu,
  close: X,
};

interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
  size?: number | string;
  className?: string;
}

export function DynamicIcon({
  name,
  size = 18,
  className = "",
  ...props
}: DynamicIconProps) {
  const IconComponent = iconMap[name] || LayoutDashboard;

  return (
    <IconComponent
      size={size}
      className={`shrink-0 transition-colors duration-200 ${className}`}
      {...props}
    />
  );
}
