"use client";

import React from "react";
import { Logo } from "./icons";
import { navigation } from "@/data/navigation.data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

export default function Sidebar() {
  const path = usePathname();

  return (
    <div className="sticky top-4 left-0 p-4 h-[calc(100vh-2rem)] flex flex-col items-start justify-start gap-8 w-2xs bg-card rounded-lg border border-border">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Logo className="size-10" />
        <p className="text-xl font-bold">FlowForge</p>
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
                "capitalize font-medium text-gray-500 group-hover:text-white duration-300 transition-colors",
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
    </div>
  );
}
