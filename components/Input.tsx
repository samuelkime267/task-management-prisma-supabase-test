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
      {label && (
        <label htmlFor={label} className={cn("block mb-1", { required })}>
          {labelText || label}
        </label>
      )}

      <div
        className={cn(
          "border border-gray-b rounded-lg focus-within:border-pri duration-300 transition-colors flex items-center justify-center gap-2 p-2",
          inputClass,
          { "border-error": error }
        )}
      >
        {children}
        <input
          className="border-none outline-none  w-full"
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
