import { useHymns } from "@/features/hymns";

function useResetActiveStates() {
  const sermonHymns = useHymns("SERMON_HYMNS");
  const worshipHymns = useHymns("HYMNAL_WORSHIP");

  function reset() {
    sermonHymns.clear();
    worshipHymns.clear();
  }
  return { reset };
}

export { useResetActiveStates };
