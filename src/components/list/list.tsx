import * as React from "react";
import { cn } from "@/lib/tailwind";
import { SortableListContextProvider } from "./list.context";

const List = React.forwardRef<
  React.ElementRef<"ul">,
  React.HTMLAttributes<HTMLUListElement> & { sortable?: boolean }
>((props, ref) => {
  const [state, setState] = React.useState<string[]>([]);
  function dispatch(id: string) {}
  return (
    <SortableListContextProvider value={{ state }}>
      <ul ref={ref} {...props} />
    </SortableListContextProvider>
  );
});
List.displayName = "sto-list";

const ListItem = React.forwardRef<React.ElementRef<"li">, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);

ListItem.displayName = "sto-list-item";

export { List, ListItem };
