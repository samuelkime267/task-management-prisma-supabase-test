/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { cn } from "@/utils";
import { UseFormRegister } from "react-hook-form";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  error?: string;
  success?: boolean;
  label?: string;
  labelText?: string;
  inputClass?: string;
  register?: UseFormRegister<any>;
  valueAsNumber?: boolean;
  children?: React.ReactNode;
  hideLabel?: boolean;
  iClass?: string;
  noBorder?: boolean;
}

export default function Input({
  label,
  required,
  labelText,
  name,
  error,
  className,
  inputClass,
  register,
  valueAsNumber,
  children,
  hideLabel,
  iClass,
  noBorder,
  ...props
}: inputProps) {
  const registration =
    (register &&
      register((name as string) || (label as string), {
        valueAsNumber,
        required,
      })) ||
    {};

  return (
    <div className={className}>
      {!hideLabel && label && (
        <label htmlFor={label} className={cn("block mb-1", { required })}>
          {labelText || label}
        </label>
      )}

      <div
        className={cn(
          "border border-input rounded-md focus-within:border-pri duration-300 transition-colors flex items-center justify-center gap-2 px-2 py-1.5 shadow-xs",
          inputClass,
          {
            "border-error": error,
            "border-none focus-within:border-transparent p-0 shadow-none":
              noBorder,
          }
        )}
      >
        {children}
        <input
          className={cn("border-none outline-none w-full text-sm", iClass)}
          id={label}
          name={name || label}
          {...registration}
          {...props}
        />
      </div>

      {error && (
        <small className="text-error capitalize text-sm mt-1 block">
          {error}
        </small>
      )}
    </div>
  );
}
