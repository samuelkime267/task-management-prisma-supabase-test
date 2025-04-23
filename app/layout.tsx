import type { Metadata } from "next";
import { fonts } from "@/data/fonts.data";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Manage your tasks",
  description: "This application is specifically tailored for task management.",
  icons: {
    icon: [{ url: "/logo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts} antialiased`}>{children}</body>
    </html>
  );
}
