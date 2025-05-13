"use client";

import React from "react";
import { Logo } from "./icons";
import { navigation } from "@/data/navigation.data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { Logout } from "@/features/auth/components";

export default function Sidebar() {
  const path = usePathname();

  return (
    <div className="sticky top-0 left-0 h-screen w-60 !p-0 card-container !border-y-none !border-l-none !rounded-none">
      <div className="p-4 flex flex-col items-start justify-start gap-8 w-full h-full after:content-[''] after:top-0 after:-right-1 after:absolute after:w-2 after:h-[75px] after:bg-card">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Logo className="size-8" />
          <p className="font-bold">FlowForge</p>
        </Link>

        <div className="flex flex-col gap-1 w-full">
          {navigation.map(({ Icon, href, name }) => (
            <Link
              href={href}
              key={name}
              className={cn(
                "flex items-center gap-2 w-full p-2 rounded-lg group hover:bg-pri duration-300",
                {
                  "bg-pri": path === href,
                }
              )}
            >
              <Icon
                className={cn(
                  "size-6 text-gray-500 group-hover:text-white duration-300 transition-colors",
                  {
                    "text-white": path === href,
                  }
                )}
              />
              <p
                className={cn(
                  "capitalize text-gray-500 group-hover:text-white duration-300 transition-color text-sm",
                  {
                    "text-white": path === href,
                  }
                )}
              >
                {name}
              </p>
            </Link>
          ))}
        </div>

        <Logout btnType="secondary" className="w-full mt-auto" />
      </div>
    </div>
  );
}
