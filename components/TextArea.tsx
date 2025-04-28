/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { cn } from "@/utils";
import { UseFormRegister } from "react-hook-form";

interface textareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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
}

export default function TextArea({
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
  ...props
}: textareaProps) {
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
          "border border-gray-b rounded-lg focus-within:border-pri duration-300 transition-colors flex items-center justify-center gap-2 p-2 h-32",
          inputClass,
          { "border-error": error }
        )}
      >
        {children}
        <textarea
          className="border-none outline-none  w-full h-full resize-none"
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
