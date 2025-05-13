import type { Metadata } from "next";
import { fonts } from "@/data/fonts.data";
import "@/styles/globals.css";
import "react-circular-progressbar/dist/styles.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ReduxProvider from "@/lib/ReduxProvider";
import TimeTracker from "@/features/timer/components/TimeTracker";
import { Toaster } from "@/components/ui/sonner";

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
    <ReduxProvider>
      <html lang="en">
        <body className={`${fonts} antialiased`}>
          <div className="flex items-start justify-center relative">
            <Sidebar />
            <div className="w-full">
              <Header />
              <div className="w-full p-4 ">{children}</div>
            </div>

            <TimeTracker />
          </div>
          <Toaster />
        </body>
      </html>
    </ReduxProvider>
  );
}
