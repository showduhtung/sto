import { WindowPortal } from "@/components/portal";
import { useProjector } from "@/features/projector";
import { useSermonHymns, useWorshipHymns } from "@/features/hymns";

import { Controller } from "./controller";
import { Projector } from "./projector";

function App() {
  const { display, toggle, dimensions } = useProjector();
  const { close: closeWorshipHymn } = useWorshipHymns();
  const { close: closeSermonHymn } = useSermonHymns();

  function clear() {
    toggle();
    closeWorshipHymn();
    closeSermonHymn();
  }

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
