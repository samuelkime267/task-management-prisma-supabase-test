"use client";

import { cn } from "@/utils";
import React from "react";
import { TaskStatus } from "@/prisma/generated/prisma";

export type btnType = "primary" | "secondary" | TaskStatus;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: btnType;
}

export default function Button({
  btnType,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(btnType, className)} {...props}>
      {children}
    </button>
  );
}
