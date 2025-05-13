import { cn } from "@/utils";
import React from "react";

type modalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  overlayClick?: () => void;
  className?: string;
};

export default function Modal({
  children,
  isOpen,
  overlayClick,
  className,
}: modalProps) {
  return (
    isOpen && (
      <>
        <div
          className="fixed top-0 left-0 w-full h-full z-[9999] bg-black/70"
          onClick={overlayClick}
        />
        <div className="fixed top-0 left-0 w-full h-full flex items-start justify-center pointer-events-none z-[10000] p-8 overflow-y-auto">
          <div
            className={cn(
              "w-full max-w-xl card-container pointer-events-auto my-auto",
              className
            )}
          >
            {children}
          </div>
        </div>
      </>
    )
  );
}
