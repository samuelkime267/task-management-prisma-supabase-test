import { cn } from "@/utils";
import React from "react";

export default function Loader({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("animate-spin", className)}
      {...props}
    >
      <path
        d="M21 12C20.9999 13.9006 20.3981 15.7524 19.2809 17.2899C18.1637 18.8275 16.5885 19.9719 14.7809 20.5592C12.9733 21.1464 11.0262 21.1464 9.21864 20.559C7.41109 19.9717 5.83588 18.8272 4.71876 17.2895C3.60165 15.7519 2.99999 13.9001 3 11.9995C3.00001 10.0989 3.60171 8.24712 4.71884 6.70951C5.83598 5.1719 7.4112 4.02742 9.21877 3.44009C11.0263 2.85276 12.9734 2.85273 14.781 3.44001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
