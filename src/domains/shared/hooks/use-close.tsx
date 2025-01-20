import { useBaseHymn } from "@/domains/hymns";
import { useProjectorStore } from "@/domains/projector";
import { useCallback } from "react";

function useClose() {
  const { toggle } = useProjectorStore();
  const { clear: clearSermonHymns } = useBaseHymn("SERMON_HYMNS");
  const { clear: clearWorshipHymns } = useBaseHymn("HYMNAL_WORSHIP");

  const reset = useCallback(() => {
    clearSermonHymns();
    clearWorshipHymns();
  }, [clearSermonHymns, clearWorshipHymns]);

  const close = useCallback(() => {
    toggle();
    reset();
  }, [toggle, reset]);

  return { close };
}

export { useClose };
