import type { HymnId } from "~/models";
import { createSafeContext } from "@/utilities";
import type { HymnDisplayType } from "./store";

type HymnMetadata = { id: HymnId; type: HymnDisplayType };

const [HymnContextProvider, useHymnContext] = createSafeContext<HymnMetadata>(
  "useHymnContext should be wrapped in a HymnContextProvider",
);

export { HymnContextProvider, useHymnContext };
