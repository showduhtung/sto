import { Fragment, type PropsWithChildren } from "react";
import {
  DraggableItem,
  type DraggableItemProps,
  type DraggableProps,
  DraggableProvider,
} from "./list.draggable";
import { cn } from "@/lib/tailwind";
import { ListContextProvider, useListContext } from "./list.context";

type ListProps = PropsWithChildren<{ draggable?: boolean; className?: string } & DraggableProps>;

function List({ children, draggable, className, onChange, ...props }: ListProps) {
  if (draggable && !onChange) throw new Error("Draggable lists must have an onChange prop");

  const Wrapper = draggable ? DraggableProvider : Fragment;
  return (
    <ListContextProvider value={{ state: { draggable } }}>
      <Wrapper onChange={onChange}>
        <ul className={cn("flex flex-col gap-2", className)} {...props} role="application">
          {children}
        </ul>
      </Wrapper>
    </ListContextProvider>
  );
}

type ListItemProps = PropsWithChildren<DraggableItemProps & { className?: string }>;

function ListItem({ children, className, ...props }: ListItemProps) {
  const { state } = useListContext();

  const Wrapper = state.draggable ? DraggableItem : Fragment;
  return (
    <Wrapper {...props}>
      <li className={className}>{children}</li>
    </Wrapper>
  );
}

export { List, ListItem };
