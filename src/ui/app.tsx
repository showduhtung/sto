import { WindowPortal } from "@/components/window";

import { useClose } from "@/utilities";
import { useProjector } from "@/features/projector";
import { Projector } from "./projector";
import { Controller } from "./controller";

function App() {
  const [open, close] = useClose();
  const { dimensions } = useProjector();

  return (
    <>
      <Controller />
      <WindowPortal open={open} onClose={close} {...dimensions}>
        <Projector />
      </WindowPortal>
    </>
  );
}

export { App };
