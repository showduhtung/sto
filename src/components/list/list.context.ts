import { createSafeContext } from "@/utilities";

type ListContext = {
  state: { draggable: boolean | undefined };
};

const [ListContextProvider, useListContext] = createSafeContext<ListContext>(
  "useListContext must be used within a ListProvider",
);

export { ListContextProvider, useListContext };
