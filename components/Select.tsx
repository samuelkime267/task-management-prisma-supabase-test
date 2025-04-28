"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import Button from "./Button";
import { Chevron } from "./icons";

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
}: selectProps) {
  const defaultOption = data.find((item) => item.value === defaultValue);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<dataType | undefined>(
    defaultOption
  );
  const toggleSelect = () => setIsSelectOpen((prev) => !prev);
  const closeSelect = () => setIsSelectOpen(false);

  useEffect(() => {
    if (selectedValue && onSelectChange) onSelectChange(selectedValue.value);
  }, [selectedValue]);

  return (
    <div className={cn("w-full", className)}>
      {!hideLabel && label && (
        <label htmlFor={label} className={cn("block mb-1", { required })}>
          {labelText || label}
        </label>
      )}

      <div className="relative w-full">
        <Button
          btnType="secondary"
          type="button"
          className={cn(
            "w-full flex items-center !justify-between gap-4 !shadow-none",
            {
              "!border-pri": isSelectOpen,
              "!border-error": !!error,
            },
            btnClass
          )}
          onClick={toggleSelect}
        >
          {selectedValue?.option || "Select an option"}
          <Chevron
            className={cn("size-6 duration-300", {
              "rotate-180": !isSelectOpen,
            })}
          />
        </Button>

        {isSelectOpen && (
          <div
            className={cn(
              "absolute left-0 bottom-0 card-container translate-y-[calc(100%+0.5rem)] w-full min-w-fit grid grid-cols-1 gap-1.5 !p-2",
              {
                "!border-error": !!error,
              }
            )}
          >
            {data.map(({ option, value }) => (
              <div
                key={value}
                onClick={() => {
                  setSelectedValue({ option, value });
                  closeSelect();
                }}
                className={cn(
                  "rounded-lg w-full p-1.5 capitalize hover:bg-border duration-300 cursor-pointer",
                  { "bg-border": selectedValue?.value === value }
                )}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <small className="text-error capitalize text-sm mt-1 block">
          {error}
        </small>
      )}
    </div>
  );
}
