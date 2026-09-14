import "@/app/globals.css";
import { fontSans, fontHeading, fontMono } from "@/frontend/config/fonts";
import { constructMetadata } from "@/frontend/lib/seo";
import { Providers } from "./providers";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}