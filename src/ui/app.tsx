import { useEffect } from "react";
import { WindowPortal } from "@/components/window";

import { useProjector, useClose } from "@/features/projector";
import { Projector } from "./projector";
import { Controller } from "./controller";
import { LanguageProvider } from "@/features/languages";

function App() {
  const { dimensions, display } = useProjector();
  const { close } = useClose();

  useEffect(() => {
    window.addEventListener("beforeunload", close);
    return () => window.removeEventListener("beforeunload", close);
  }, [close]);

  return (
    <LanguageProvider>
      <Controller />
      <WindowPortal open={Boolean(display)} onClose={close} {...dimensions}>
        <Projector />
      </WindowPortal>
    </LanguageProvider>
  );
}

export { App };
