import { WindowPortal } from "@/components/window";

import { useProjector } from "@/features/projector";
import { Projector } from "./projector";
import { Controller } from "./controller";

function App() {
  const { dimensions, display, toggle } = useProjector();

  return (
    <>
      <Controller />
      <WindowPortal open={Boolean(display)} onClose={() => toggle()} {...dimensions}>
        <Projector />
      </WindowPortal>
    </>
  );
}

export { App };
