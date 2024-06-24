import { useHymn } from "@/features/hymns";
import { useProjector } from "@/features/projector";
import { useCallback } from "react";

function useClose() {
  const { toggle } = useProjector();
  const { clear: clearSermonHymns } = useHymn("SERMON_HYMNS");
  const { clear: clearWorshipHymns } = useHymn("HYMNAL_WORSHIP");

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
