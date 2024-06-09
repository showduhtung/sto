import { useHymns } from "@/features/hymns";
import { useCallback } from "react";

function useResetActiveStates() {
  const { clear: clearSermonHymns } = useHymns("SERMON_HYMNS");
  const { clear: clearWorshipHymns } = useHymns("HYMNAL_WORSHIP");

  const reset = useCallback(() => {
    clearSermonHymns();
    clearWorshipHymns();
  }, [clearSermonHymns, clearWorshipHymns]);

  return { reset };
}

export { useResetActiveStates };
