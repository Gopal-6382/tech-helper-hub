import { NavItem } from "@/frontend/config/navigation.types";

export const chatNavRoutes: NavItem = {
  title: "Chat",
  href: "/web/chat",
  icon: "chat",
  children: [
    { title: "Direct Chat", href: "/web/chat/direct-chat" },
    { title: "Group Discussions", href: "/web/chat/group-chat" },
  ],
};
