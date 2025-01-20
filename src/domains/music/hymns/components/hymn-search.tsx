import { type KeyboardEvent, useRef, useState } from "react";
import { useClickAway, useToggle } from "react-use";
import type { HymnId } from "~/models";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  type CommandInputProps,
} from "@/ui/components/command";

import { cn } from "@/lib/tailwind";
import { useHymnTitlesQuery } from "../apis";

type HymnSearchProps = Omit<CommandInputProps, "onChange"> & {
  id: string;
  onChange?: (id: HymnId) => void;
};

function HymnSearch({ id, onChange }: HymnSearchProps) {
  const { data: titles = [] } = useHymnTitlesQuery({ language: "en" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, toggle] = useToggle(false);
  const [value, setValue] = useState("");

  useClickAway(inputRef, () => toggle(false));

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!inputRef.current) return;
    if (!open) toggle(true); // Keep the options displayed when the user is typing
    if (event.key === "Escape") {
      inputRef.current.blur();
      toggle(false);
      setValue("");
    }
  }

  function handleSelect({ id }: { title: string; id: HymnId }) {
    onChange?.(id);
    toggle(false);
    setValue("");
  }

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible"
      filter={(val, search) => {
        if (val.toLowerCase().includes(search.toLowerCase())) return 1;
        return 0;
        // not sure why the list unsorts itself after first search without using a custom sort/filter
      }}
    >
      <CommandInput
        id={id}
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
              {titles.map(({ id, title }) => (
                <CommandItem
                  key={id}
                  value={title}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onSelect={() => {
                    if (open) handleSelect({ id, title });
                  }}
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
