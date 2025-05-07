"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}
const trips = [
  {
    value: "",
    label: "None",
  },
  {
    value: "Vacation",
    label: "Vacation",
  },
  {
    value: "Honeymoon",
    label: "Honeymoon",
  },
  {
    value: "Adventure",
    label: "Adventure",
  },
  {
    value: "Business",
    label: "Business",
  },
  {
    value: "Solo",
    label: "Solo",
  },
  {
    value: "Friends",
    label: "Friends",
  },
];

export function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {value ? trips.find((trip) => trip.value === value)?.label : "Select Trip..."}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search trip...' className='h-9' />
          <CommandList>
            <CommandEmpty>No trip found.</CommandEmpty>
            <CommandGroup>
              {trips.map((trip) => (
                <CommandItem
                  key={trip.value}
                  value={trip.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {trip.label}
                  <Check className={cn("ml-auto", value === trip.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
