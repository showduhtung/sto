import { useCallback, useEffect } from "react";
import { useProjector } from "@/features/projector";
import { useResetActiveStates } from "./use-reset-store";

function useExitApp() {
  const { toggle } = useProjector();
  const { reset } = useResetActiveStates();

  const clear = useCallback(() => {
    toggle();
    reset();
  }, [toggle, reset]);

  useEffect(() => {
    window.addEventListener("beforeunload", clear);
    return () => window.removeEventListener("beforeunload", clear);
  }, [clear]);
}

export { useExitApp };
