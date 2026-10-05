"use client";

import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ColorThemeProvider } from "@/frontend/providers/theme-provider";
import QueryProvider from "@/frontend/providers/query-provider";
import { Toaster } from "@/frontend/components/ui/toast";

import { AuthProvider } from "@/frontend/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme-mode"
        >
          <ColorThemeProvider>
            {children}
            <Toaster />
          </ColorThemeProvider>
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={true} />
      </AuthProvider>
    </QueryProvider>
  );
}
