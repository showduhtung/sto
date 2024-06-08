import { WindowPortal } from "@/components/window";

import { useWindow } from "@/utilities";
import { useProjector } from "@/features/projector";
import { Projector } from "./projector";
import { Controller } from "./controller";

function App() {
  const { open, clear } = useWindow();
  const { dimensions } = useProjector();

  return (
    <>
      <Controller />
      <WindowPortal open={open} onClose={clear} {...dimensions}>
        <Projector />
      </WindowPortal>
    </>
  );
}

export { App };
