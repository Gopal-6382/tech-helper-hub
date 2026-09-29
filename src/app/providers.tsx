"use client";

import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ColorThemeProvider } from "@/frontend/providers/theme-provider";
import QueryProvider from "@/frontend/providers/query-provider";
import { Toaster } from "@/frontend/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
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
    </QueryProvider>
  );
}
