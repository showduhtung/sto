import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type HymnActions = {
  add: (hymnId: string) => void;
  close: () => void;
  remove: (hymnId: string) => void;
  reorganize: (hymnIds: string[]) => void;
  setVerse: (hymnId: string, verse: number) => void;
};

type HymnState = {
  hymnIds: string[];
  activeHymnId: string; // hymn number: 296A
  activeVerse: number; // verses array idx
};

const hymnStore: StateCreator<HymnState & HymnActions> = (set) => ({
  hymnIds: [],
  activeHymnId: "",
  activeVerse: -1,
  shouldWrap: false,
  add: (hymnId: string) => set(({ hymnIds }) => ({ hymnIds: [...hymnIds, hymnId] })),
  reorganize: (hymnIds: string[]) => set(() => ({ hymnIds })),
  remove: (hymnId: string) => {
    set(({ hymnIds, activeHymnId }) => {
      const clearActiveHymn = activeHymnId === hymnId ? { activeHymnId: "", activeVerse: -1 } : {};
      const newHymnIds = hymnIds.filter((id) => id !== hymnId);

      return { hymnIds: newHymnIds, ...clearActiveHymn };
    });
  },

  close: () => set(() => ({ activeHymnId: "", activeVerse: -1 })),
  setVerse: (activeHymnId: string, activeVerse: number) =>
    set(() => ({ activeHymnId, activeVerse })),
});

const useSermonHymns = create(persist(hymnStore, { name: "sermon-hymns" }));
const useWorshipHymns = create(persist(hymnStore, { name: "worship-hymns" }));

type HymnDisplayType = "SERMON_HYMNS" | "HYMNAL_WORSHIP";

export type { HymnDisplayType };
export { useSermonHymns, useWorshipHymns };
