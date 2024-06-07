import { type HymnDisplayType, useSermonHymns, useWorshipHymns } from "./hymn-display.store";
import { useHymnSettings } from "./hymn-settings.store";

function useHymns(type: HymnDisplayType) {
  const sermonHymns = useSermonHymns();
  const worshipHymns = useWorshipHymns();
  const settings = useHymnSettings();

  const hymns = { SERMON_HYMNS: sermonHymns, HYMNAL_WORSHIP: worshipHymns };
  return { ...hymns[type], ...settings };
}

export type { HymnDisplayType };
export { useHymns, useHymnSettings };
