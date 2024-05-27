import { createSafeContext } from "@/utilities/create-safe-context";

type SortableListState = string[];
type SortableListContext = {
  state: SortableListState;
  // dispatch: (id: string) => void;
};

const [SortableListContextProvider, useSortableListContext] =
  createSafeContext<SortableListContext>(
    "useSortableListContext must be used within a SortableListContextProvider",
  );

export { SortableListContextProvider, useSortableListContext };
