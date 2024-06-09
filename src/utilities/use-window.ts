import { useProjector } from "@/features/projector";
import { useResetActiveStates } from "./use-reset-store";

function useWindow() {
  const { display, toggle } = useProjector();
  const { reset } = useResetActiveStates();

  function clear() {
    reset();
    toggle();
  }
  return { open: Boolean(display), clear, display };
}

export { useWindow };
