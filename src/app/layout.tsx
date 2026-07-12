import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Helper Hub",
  description:
    "Community-driven platform for problem solving and professional technical assistance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
