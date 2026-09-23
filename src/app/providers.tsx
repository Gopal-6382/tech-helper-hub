"use client";

import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ColorThemeProvider } from "@/frontend/providers/theme-provider";
import QueryProvider from "@/frontend/providers/query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="theme-mode"
      >
        <ColorThemeProvider>{children}</ColorThemeProvider>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryProvider>
  );
}
