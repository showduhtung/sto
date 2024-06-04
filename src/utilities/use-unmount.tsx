import { useCallback, useEffect } from "react";
import { useProjector } from "@/features/projector";

function useUnmount(fn: () => void) {
  const { toggle } = useProjector();

  const clear = useCallback(() => {
    toggle();
    fn();
  }, [toggle, fn]);

  useEffect(() => {
    window.addEventListener("beforeunload", clear);
    return () => window.removeEventListener("beforeunload", clear);
  }, [clear]);
}

export { useUnmount };
