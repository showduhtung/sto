import { WindowPortal } from "@/components/window";

import { useProjector } from "@/features/projector";
import { Projector } from "./projector";
import { Controller } from "./controller";
import { useResetActiveStates } from "@/utilities";
import { LanguageProvider } from "@/features/languages";

function App() {
  const { dimensions, display, toggle } = useProjector();
  const { reset } = useResetActiveStates();

  function handleClose() {
    toggle();
    reset();
  }

  return (
    <LanguageProvider>
      <Controller />
      <WindowPortal open={Boolean(display)} onClose={handleClose} {...dimensions}>
        <Projector />
      </WindowPortal>
    </LanguageProvider>
  );
}

export { App };
