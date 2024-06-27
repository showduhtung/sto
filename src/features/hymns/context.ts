import type { HymnId } from "~/models";
import { createSafeContext } from "@/utilities";
import type { HymnDisplayType } from "./store";

type HymnCardContext = { hymnId: HymnId };

const [HymnCardContextProvider, useBaseHymnCardContext] = createSafeContext<HymnCardContext>(
  "useHymnCardContext should be wrapped in a HymnCardContextProvider",
);

function useHymnCardContext() {
  const { type } = useHymnContext();
  const { hymnId } = useBaseHymnCardContext();
  return { hymnId, type };
}

type HymnContext = { type: HymnDisplayType };

const [HymnContextProvider, useHymnContext] = createSafeContext<HymnContext>(
  "useHymnContext should be wrapped in a HymnContextProvider",
);

export { HymnCardContextProvider, useHymnCardContext, HymnContextProvider, useHymnContext };
