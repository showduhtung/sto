import type { HymnId } from "~/models";
import { createSafeContext } from "@/utilities";
import type { HymnDisplayType } from "./store";

type HymnCardContext = { hymnId: HymnId };

const [HymnContextProvider, useBaseHymnCardContext] = createSafeContext<HymnCardContext>(
  "useHymnContext should be wrapped in a HymnContextProvider",
);

function useHymnContext() {
  const { type } = useHymnTypeContext();
  const { hymnId } = useBaseHymnCardContext();
  return { hymnId, type };
}

type HymnContext = { type: HymnDisplayType };

const [HymnTypeContextProvider, useHymnTypeContext] = createSafeContext<HymnContext>(
  "useHymnTypeContext should be wrapped in a HymnTypeContextProvider",
);

export { HymnContextProvider, useHymnContext, HymnTypeContextProvider, useHymnTypeContext };
