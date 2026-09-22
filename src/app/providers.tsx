"use client";

import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ColorThemeProvider } from "@/frontend/providers/theme-provider";
import { queryClient } from "@/frontend/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="theme-mode"
      >
        <ColorThemeProvider>{children}</ColorThemeProvider>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
