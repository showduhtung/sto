import { WindowPortal } from "@/components/portal";
import { useProjector } from "@/features/projector";

import { Controller } from "./controller";
import { Projector } from "./projector";
import { useHymns } from "@/features/hymns";

function App() {
  const { display, toggle, dimensions } = useProjector();
  const sermonHymns = useHymns("SERMON_HYMNS");
  const worshipHymns = useHymns("HYMNAL_WORSHIP");

  function clear() {
    sermonHymns.close();
    worshipHymns.close();
    toggle();
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
