import type { Metadata } from "next";
import { fonts } from "@/data/fonts.data";
import "@/styles/globals.css";
import { Header, Sidebar } from "@/components";

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
      <body className={`${fonts} antialiased`}>
        <div className="flex items-start justify-center relative p-4">
          <Sidebar />
          <div className="w-full px-4">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
