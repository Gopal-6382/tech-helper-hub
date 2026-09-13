"use client";

import React, { useState } from "react";
import Link from "next/link";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop & Tablet Sidebar (Hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 font-bold text-xl text-indigo-600 border-b border-gray-100">
          Tech Helper Hub
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Slide-over */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="font-bold text-xl text-indigo-600">
            Tech Helper Hub
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Top Header with Sandwich Bar for Mobile */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 md:justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
            aria-label="Open Menu"
          >
            {/* Sandwich Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* User profile / extra header actions can go here */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Admin / User
            </span>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

// Reusable navigation links matching your backend modules
function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Bookings", href: "/bookings" },
    { name: "Services", href: "/services" },
    { name: "Direct Chat", href: "/chat" },
    { name: "Group Chat", href: "/groups" },
    { name: "Posts & Feed", href: "/posts" },
    { name: "Admin Categories", href: "/admin/categories" },
    { name: "Verification", href: "/verification" },
  ];

  return (
    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onItemClick}
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
