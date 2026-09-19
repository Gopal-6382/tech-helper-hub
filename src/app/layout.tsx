import type { ReactNode } from "react";
import Script from "next/script";
import { Inter } from "next/font/google";

import "@/app/globals.css";

import { fontSans, fontHeading, fontMono } from "@/frontend/config/fonts";

import { constructMetadata } from "@/frontend/lib/seo";
import { Providers } from "./providers";
import { TooltipProvider } from "@/frontend/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = constructMetadata();

const sidebarInitScript = `
(function () {
  try {
    var collapsed =
      localStorage.getItem("sidebar_collapsed") === "true";

    document.documentElement.setAttribute(
      "data-sidebar-collapsed",
      collapsed ? "true" : "false"
    );
  } catch (error) {
    document.documentElement.setAttribute(
      "data-sidebar-collapsed",
      "false"
    );
  }
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        fontSans.variable,
        fontHeading.variable,
        fontMono.variable,
        inter.variable,
      ].join(" ")}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <Script
          id="sidebar-state-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: sidebarInitScript,
          }}
        />
      </head>

      <body className="min-h-screen bg-background font-sans antialiased">
        <TooltipProvider>
          <Providers>{children}</Providers>
        </TooltipProvider>
      </body>
    </html>
  );
}
