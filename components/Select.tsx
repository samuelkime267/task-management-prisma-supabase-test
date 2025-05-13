"use client";

import React, { useState } from "react";
import { cn } from "@/utils";

import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type dataType = {
  value: string;
  option: string;
};

type selectProps = {
  error?: string;
  success?: boolean;
  label?: string;
  labelText?: string;
  btnClass?: string;
  hideLabel?: boolean;
  noBorder?: boolean;
  required?: boolean;
  data: dataType[];
  className?: string;
  onSelectChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
};

export default function Select({
  label,
  required,
  labelText,
  error,
  className,
  btnClass,
  hideLabel,
  data,
  onSelectChange,
  defaultValue,
  placeholder,
}: selectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const defaultOption = data.find((item) => item.value === defaultValue);

  return (
    <div className={cn("w-full", className)}>
      {!hideLabel && label && (
        <label htmlFor={label} className={cn("block mb-1", { required })}>
          {labelText || label}
        </label>
      )}

      <SelectUI
        defaultValue={defaultOption?.value}
        onValueChange={onSelectChange}
        onOpenChange={setIsSelectOpen}
      >
        <SelectTrigger
          className={cn("w-full transition-colors duration-300", btnClass, {
            "border-error": error,
            "border-pri": isSelectOpen,
          })}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="relative">
          <SelectGroup>
            {data.map(({ option, value }) => (
              <SelectItem key={value} value={value}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectUI>

      {error && (
        <small className="text-error capitalize text-sm mt-1 block">
          {error}
        </small>
      )}
    </div>
  );
}
