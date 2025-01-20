import { useBaseHymnsStore } from "@/domains/music/hymns";
import { useProjectorStore } from "@/domains/projector";
import { useCallback } from "react";

function useClose() {
  const { toggle } = useProjectorStore();
  const { clear: clearSermonHymns } = useBaseHymnsStore("SERMON_HYMNS");
  const { clear: clearWorshipHymns } = useBaseHymnsStore("HYMNAL_WORSHIP");

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
