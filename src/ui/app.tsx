import { WindowPortal } from "@/components/window";

import { useProjector } from "@/features/projector";
import { Projector } from "./projector";
import { Controller } from "./controller";
import { useResetActiveStates } from "@/utilities";

function App() {
  const { dimensions, display, toggle } = useProjector();
  const { reset } = useResetActiveStates();

  return (
    <>
      <Controller />
      <WindowPortal
        open={Boolean(display)}
        onClose={() => {
          toggle();
          reset();
        }}
        {...dimensions}
      >
        <Projector />
      </WindowPortal>
    </>
  );
}

export { App };
