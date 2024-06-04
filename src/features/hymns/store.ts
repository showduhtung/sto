import { create, createStore, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type HymnActions = {
  update: <T extends keyof HymnState>(key: T, payload: HymnState[T]) => void;
  setVerse: (hymnId: string, verse: number) => void;
  close: () => void;
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
  update: (key, payload) => set(() => ({ [key]: payload })),
  setVerse: (activeHymnId: string, activeVerse: number) =>
    set(() => ({ activeHymnId, activeVerse })),
  close: () => set(() => ({ activeHymnId: "", activeVerse: -1 })),
});

const useSermonHymns = create(persist(hymnStore, { name: "sermon-hymns" }));
const useWorshipHymns = create(persist(hymnStore, { name: "worship-hymns" }));

export { useSermonHymns, useWorshipHymns };
