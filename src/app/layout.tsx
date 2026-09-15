import "@/app/globals.css";
import { Inter } from "next/font/google";
import { fontSans, fontHeading, fontMono } from "@/frontend/config/fonts";
import { constructMetadata } from "@/frontend/lib/seo";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable} ${inter.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var collapsed = localStorage.getItem('sidebar_collapsed') === 'true';
                  if (collapsed) {
                    document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
                  } else {
                    document.documentElement.setAttribute('data-sidebar-collapsed', 'false');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
