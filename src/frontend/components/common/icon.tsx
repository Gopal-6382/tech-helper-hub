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
  Home,
  Bookmark,
  Search,
  Bell,
  Plus,
  LucideProps,
} from "lucide-react";

export type IconName =
  | "home"
  | "community"
  | "saved"
  | "servicerequests"
  | "bookings"
  | "professionals"
  | "messages"
  | "notifications"
  | "profile"
  | "settings"
  | "posts"
  | "reports"
  | "dashboard"
  | "categories"
  | "reviews"
  | "chevronDown"
  | "chevronRight"
  | "menu"
  | "close"
  | "plus";

const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
  home: Home,
  community: Users,
  saved: Bookmark,
  servicerequests: Wrench,
  bookings: CalendarCheck,
  professionals: Search,
  messages: MessageSquare,
  notifications: Bell,
  profile: User,
  settings: Settings,
  posts: FileText,
  reports: AlertCircle,
  dashboard: LayoutDashboard,
  categories: FolderTree,
  reviews: Star,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  menu: Menu,
  close: X,
  plus: Plus,
};

interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
  size?: number;
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
      width={size}
      height={size}
      className={`shrink-0 transition-colors duration-200 ${className}`}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}
