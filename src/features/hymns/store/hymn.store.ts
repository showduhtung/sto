import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import type { HymnId } from "~/models";

type HymnActions = {
  add: (hymnId: HymnId) => void;
  clear: () => void;
  remove: (hymnId: HymnId) => void;
  reorganize: (hymnIds: HymnId[]) => void;
  sing: (activeHymnId: ActiveHymnId, activeVerse: number) => void;
};

type HymnState = {
  hymnIds: HymnId[];
  activeHymnId: ActiveHymnId; // hymn number: 296A
  activeVerse: number; // verses array idx
};

const hymnStore: StateCreator<HymnState & HymnActions> = (set) => ({
  hymnIds: [],
  activeHymnId: "",
  activeVerse: -1,
  add: (hymnId: HymnId) => set(({ hymnIds }) => ({ hymnIds: [...hymnIds, hymnId] })),
  reorganize: (hymnIds: HymnId[]) => set(() => ({ hymnIds })),
  remove: (hymnId: HymnId) => {
    set(({ hymnIds, activeHymnId, activeVerse }) => {
      const newHymnIds = hymnIds.filter((id) => id !== hymnId);
      const newActiveHymnId = newHymnIds.find((id) => id === activeHymnId) || "";
      const newActiveVerse = newActiveHymnId === "" ? -1 : activeVerse;

      return { hymnIds: newHymnIds, activeHymnId: newActiveHymnId, activeVerse: newActiveVerse };
    });
  },

  clear: () => set(() => ({ activeHymnId: "", activeVerse: -1 })),
  sing: (activeHymnId: ActiveHymnId, activeVerse: number) =>
    set(() => ({ activeHymnId, activeVerse })),
});

const useSermonHymns = create(persist(hymnStore, { name: "sto-sermon-hymns" }));
const useWorshipHymns = create(persist(hymnStore, { name: "sto-worship-hymns" }));

type HymnDisplayType = "SERMON_HYMNS" | "HYMNAL_WORSHIP";

export type { HymnDisplayType, HymnId, ActiveHymnId };
export { useSermonHymns, useWorshipHymns };

type ActiveHymnId = HymnId | "";
