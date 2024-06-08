import { useProjector } from "@/features/projector";
import { useHymns } from "@/features/hymns";

function useClose() {
  const { display, toggle } = useProjector();
  const sermonHymns = useHymns("SERMON_HYMNS");
  const worshipHymns = useHymns("HYMNAL_WORSHIP");

  function clear() {
    sermonHymns.close();
    worshipHymns.close();
    toggle();
  }
  return [Boolean(display), clear] as const;
}

export { useClose };
