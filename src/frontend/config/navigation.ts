// src/frontend/config/navigation.ts

import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  Bookmark,
  Briefcase,
  Calendar,
  Search,
  MessageCircle,
  Bell,
  User,
  Settings,
  Wrench,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const userNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/web",
    icon: Home,
  },
  {
    title: "Community",
    href: "/web/group-chat",
    icon: Users,
  },
  {
    title: "Saved",
    href: "/web/saved",
    icon: Bookmark,
  },
  {
    title: "My Requests",
    href: "/web/servicerequests",
    icon: Briefcase,
  },
  {
    title: "Bookings",
    href: "/web/bookings",
    icon: Calendar,
  },
  {
    title: "Find Professionals",
    href: "/web/professionals",
    icon: Search,
  },
  {
    title: "Messages",
    href: "/web/direct-chat",
    icon: MessageCircle,
  },
  {
    title: "Notifications",
    href: "/web/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/web/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/web/professional",
    icon: Settings,
  },
];

export const professionalNavigation: NavItem[] = [
  {
    title: "Professional Dashboard",
    href: "/web/professional",
    icon: Wrench,
  },
  {
    title: "My Jobs",
    href: "/web/professional/jobs",
    icon: Briefcase,
  },
  {
    title: "Availability",
    href: "/web/professional/availability",
    icon: Calendar,
  },
  {
    title: "Professional Profile",
    href: "/web/professional/profile",
    icon: User,
  },
];
