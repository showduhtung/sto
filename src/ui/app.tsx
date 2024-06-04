import { WindowPortal } from "@/components/portal";
import { useProjector } from "@/features/projector";
import { useSermonHymns, useWorshipHymns } from "@/features/hymns";

import { Controller } from "./controller";
import { Projector } from "./projector";
import { useCallback, useEffect } from "react";

function App() {
  const { display, toggle, dimensions } = useProjector();
  const { close: closeWorshipHymn } = useWorshipHymns();
  const { close: closeSermonHymn } = useSermonHymns();

  const clear = useCallback(() => {
    toggle();
    closeWorshipHymn();
    closeSermonHymn();
  }, [toggle, closeWorshipHymn, closeSermonHymn]);

  useEffect(() => {
    window.addEventListener("beforeunload", clear);
    return () => window.removeEventListener("beforeunload", clear);
  }, [clear]);

  return (
    <>
      <Controller />
      <WindowPortal open={Boolean(display)} onClose={clear} {...dimensions}>
        <Projector />
      </WindowPortal>
    </>
  );
}

export { App };
