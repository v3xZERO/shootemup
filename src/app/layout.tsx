import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shoot Em Up",
  description: "A terminal-style shoot em up game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
