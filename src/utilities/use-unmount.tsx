import { useCallback, useEffect } from "react";
import { useProjector } from "@/features/projector";

function useUnmount(fn: () => void | (() => void)[]) {
  const { toggle } = useProjector();

  const clear = useCallback(() => {
    toggle();
    if (Array.isArray(fn)) fn.forEach((f) => f());
    else fn();
  }, [toggle, fn]);

  useEffect(() => {
    window.addEventListener("beforeunload", clear);
    return () => window.removeEventListener("beforeunload", clear);
  }, [clear]);
}

export { useUnmount };
