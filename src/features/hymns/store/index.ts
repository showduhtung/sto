import { type HymnDisplayType, useSermonHymns, useWorshipHymns } from "./hymn.store";
import { useHymnSettings } from "./hymn-settings.store";
import { useHymnTypeContext } from "../context";

function useBaseHymn(type: HymnDisplayType) {
  const sermonHymns = useSermonHymns();
  const worshipHymns = useWorshipHymns();
  const settings = useHymnSettings();

  const hymns = {
    SERMON_HYMNS: sermonHymns,
    HYMNAL_WORSHIP: worshipHymns,
  };

  return { ...hymns[type], ...settings };
}

function useHymn() {
  const { type } = useHymnTypeContext();
  return useBaseHymn(type);
}

export type { HymnDisplayType };
export { useBaseHymn, useHymnSettings, useHymn };
