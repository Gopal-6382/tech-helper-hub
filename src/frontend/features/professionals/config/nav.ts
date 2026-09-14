import { NavItem } from "@/frontend/config/navigation.types";

export const professionalsNavRoutes: NavItem = {
  title: "Professionals",
  href: "/web/professionals",
  icon: "professionals",
  children: [
    { title: "Directory", href: "/web/professionals" },
    { title: "Verification Requests", href: "/web/professionals/requests" },
  ],
};