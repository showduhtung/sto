import { type HymnDisplayType, useSermonHymnsStore, useWorshipHymnsStore } from "./hymn.store";
import { useHymnSettingsStore } from "./hymn-settings.store";
import { useHymnTypeContext } from "@/domains/hymns";

function useBaseHymn(type: HymnDisplayType) {
  const sermonHymns = useSermonHymnsStore();
  const worshipHymns = useWorshipHymnsStore();
  const settings = useHymnSettingsStore();

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
export { useBaseHymn, useHymnSettingsStore, useHymn };
