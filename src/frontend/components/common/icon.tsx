import React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Wrench,
  FileText,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Search,
  Plus,
  LucideProps,
} from "lucide-react";

export type IconName =
  | "home"
  | "community"
  | "servicerequests"
  | "bookings"
  | "professionals"
  | "messages"
  | "posts"
  | "chevronDown"
  | "chevronRight"
  | "menu"
  | "close"
  | "plus";

const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
  home: Home,
  community: Users,
  servicerequests: Wrench,
  bookings: CalendarCheck,
  professionals: Search,
  messages: MessageSquare,
  posts: FileText,
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
