import { type HymnDisplayType, useSermonHymnsStore, useWorshipHymnsStore } from "./hymn.store";
import { useHymnSettingsStore } from "./hymn-settings.store";
import { useHymnTypeContext } from "@/domains/music/hymns";

function useBaseHymnsStore(type: HymnDisplayType) {
  const sermonHymns = useSermonHymnsStore();
  const worshipHymns = useWorshipHymnsStore();

  const hymns = {
    SERMON_HYMNS: sermonHymns,
    HYMNAL_WORSHIP: worshipHymns,
  };

  return hymns[type];
}

function useHymnsStore() {
  const { type } = useHymnTypeContext();
  return useBaseHymnsStore(type);
}

export type { HymnDisplayType };
export { useBaseHymnsStore, useHymnSettingsStore, useHymnsStore };
