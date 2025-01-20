import { createSafeContext } from "@/utilities";
import { type HymnDisplayType } from "./store";

type HymnTypeContext = { type: HymnDisplayType };

const [HymnTypeContextProvider, useHymnTypeContext] = createSafeContext<HymnTypeContext>(
  "useHymnTypeContext should be wrapped in a HymnTypeContextProvider",
);

export { HymnTypeContextProvider, useHymnTypeContext };
