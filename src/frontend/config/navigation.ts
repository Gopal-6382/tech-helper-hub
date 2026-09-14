import { NavItem } from "./navigation.types";
import { chatNavRoutes } from "@/frontend/features/chat/config/nav";
import { bookingsNavRoutes } from "@/frontend/features/bookings/config/nav";
import { professionalsNavRoutes } from "@/frontend/features/professionals/config/nav";

export const dashboardRoutes: NavItem[] = [
  { title: "Dashboard", href: "/web", icon: "dashboard" },
  bookingsNavRoutes,
  chatNavRoutes,
  professionalsNavRoutes,
  { title: "Service Requests", href: "/web/servicerequests", icon: "servicerequests" },
  { title: "Categories", href: "/web/categories", icon: "categories" },
  { title: "Reports", href: "/web/reports", icon: "reports" },
  {
    title: "Settings",
    href: "/web/settings",
    icon: "settings",
    children: [
      { title: "General Settings", href: "/web/settings" },
      { title: "Security", href: "/web/settings/security" },
    ],
  },
];