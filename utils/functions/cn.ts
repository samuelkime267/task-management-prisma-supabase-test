import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export default function cn(...className: ClassValue[]) {
  return twMerge(clsx(...className));
}
