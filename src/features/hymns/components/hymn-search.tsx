import { useClickAway, useToggle } from "react-use";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from "@/components/command";

import { fetchHymnTitles } from "~/apis/hymns";
import { useQuery } from "@tanstack/react-query";
import { type KeyboardEvent, useRef, useState } from "react";

import { cn } from "@/lib/tailwind";
import { InputProps } from "@/components/input";

type HymnSearchProps = Omit<InputProps, "onChange"> & { onChange?: (id: string) => void };

function HymnSearch({ onChange }: HymnSearchProps) {
  const { data } = useQuery({ queryKey: ["hymn-titles"], queryFn: () => fetchHymnTitles("en") });
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, toggle] = useToggle(false);
  const [value, setValue] = useState("");

  useClickAway(inputRef, () => toggle(false));

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const input = inputRef.current;
    if (!input) return;
    if (!open) toggle(true); // Keep the options displayed when the user is typing
    if (event.key === "Escape") {
      input.blur();
      toggle(false);
    }
  }

  function handleSelect({ title }: { title: string; id: string }) {
    onChange?.(title);
    toggle(false);
    setValue("");
  }

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible"
      filter={(value, search) => {
        if (value.toLowerCase().includes(search.toLowerCase())) return 1;
        return 0;
        // not sure why default filter fails after first search
      }}
    >
      <CommandInput
        value={value}
        onValueChange={setValue}
        ref={inputRef}
        onClick={toggle}
        placeholder="Search hymns..."
        className="h-9 w-72 cursor-pointer rounded-sm border border-primary/10 hover:border-primary/40 focus:cursor-text focus:border-2 focus:border-primary"
      />
      <div className="relative">
        <div
          className={cn(
            "absolute top-2 z-10 w-full bg-white shadow-md outline-none",
            open ? "block" : "hidden",
          )}
        >
          <CommandList>
            <CommandGroup>
              {data?.map(({ id, title }) => (
                <CommandItem
                  key={id}
                  value={title}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onSelect={() => handleSelect({ id, title })}
                  className="flex w-full items-center gap-2"
                >
                  {title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </div>
    </Command>
  );
}

export { HymnSearch };
