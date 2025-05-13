"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export default function SelectSearch({
  data,
  placeholder,
  onSelectChange,
  btnClass,
  className,
  defaultValue,
  error,
  hideLabel,
  label,
  labelText,
  required,
}: selectProps) {
  const defaultOption = data.find((item) => item.value === defaultValue);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    defaultOption?.value || ""
  );

  React.useEffect(() => {
    if (onSelectChange) onSelectChange(selectedValue);
  }, [selectedValue]);

  return (
    <div className={cn("w-full", className)}>
      {!hideLabel && label && (
        <label htmlFor={label} className={cn("block mb-1", { required })}>
          {labelText || label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between transition-colors duration-300",
              btnClass,
              {
                "border-error": error,
                "border-pri": open,
              }
            )}
          >
            {selectedValue
              ? data.find(({ value }) => value === selectedValue)?.option
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command
            filter={(itemVal, search) => {
              const currentValue = data.find(({ value }) => value === itemVal);
              if (!currentValue) return 0;

              const value = itemVal.toLowerCase();
              const option = currentValue.option.toLocaleLowerCase();

              const query = search.toLowerCase();

              if (option.includes(query) || value.includes(query)) return 1;

              return 0;
            }}
          >
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>Not found.</CommandEmpty>
              <CommandGroup>
                {data.map(({ option, value }) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={() => {
                      setSelectedValue(value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <small className="text-error capitalize text-sm mt-1 block">
          {error}
        </small>
      )}
    </div>
  );
}
