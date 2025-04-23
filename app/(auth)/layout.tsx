import type { Metadata } from "next";
import { fonts } from "@/data/fonts.data";
import "@/styles/globals.css";
import taskManagementImg from "@/assets/imgs/task-management.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Manage your tasks",
  description: "This application is specifically tailored for task management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts} antialiased`}>
        <div className="flex items-start justify-center relative">
          <div className="p-4 md:p-8 w-full max-w-lg min-h-screen flex items-center justify-center flex-col">
            {children}
          </div>
          <div className="hidden lg:block w-full h-[100dvh] overflow-hidden sticky top-0 left-0">
            <Image
              src={taskManagementImg}
              alt="task management"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
