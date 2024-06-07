import { WindowPortal } from "@/components/window";
import { useProjector } from "@/features/projector";
import { useHymns } from "@/features/hymns";
import { Projector } from "./projector";
import { Controller } from "./controller";

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
