import { cn } from "@/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "primary" | "secondary";
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
