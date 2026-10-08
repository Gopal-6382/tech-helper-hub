import { NavItem } from "./navigation.types";

export const userNavigation: NavItem[] = [
  {
    title: "Home",
    href: "/web",
    icon: "home",
  },
  {
    title: "Posts",
    href: "/web/posts",
    icon: "posts",
  },
  {
    title: "Community",
    href: "/web/group-chat",
    icon: "community",
  },
  {
    title: "Find Professionals",
    href: "/web/professionals",
    icon: "professionals",
  },
  {
    title: "My Requests",
    href: "/web/servicerequests",
    icon: "servicerequests",
  },
  {
    title: "Messages",
    href: "/web/direct-chat",
    icon: "messages",
  },
  {
    title: "Bookings",
    href: "/web/bookings",
    icon: "bookings",
  },
];

export const professionalNavigation: NavItem[] = [
  {
    title: "My Jobs",
    href: "/web/professional/jobs",
    icon: "servicerequests",
  },
  {
    title: "Availability",
    href: "/web/professional/availability",
    icon: "bookings",
  },
];
