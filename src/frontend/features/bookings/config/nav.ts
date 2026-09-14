import { NavItem } from "@/frontend/config/navigation.types";

export const bookingsNavRoutes: NavItem = {
  title: "Bookings",
  href: "/web/bookings",
  icon: "bookings",
  children: [
    { title: "All Bookings", href: "/web/bookings" },
    { title: "Pending Approval", href: "/web/bookings/pending" },
  ],
};
