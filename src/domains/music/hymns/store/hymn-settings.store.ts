import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type HymnSettingsState = {
  shouldWrapVerses: boolean; // if bilingual and incongruent number of verses, should wrap verses?
  audioPlayback: boolean;
  timestampTools: boolean;
};

type HymnSettingsActions = {
  update: <T extends keyof HymnSettingsState>(key: T, value: HymnSettingsState[T]) => void;
};

const hymnSettingsStore: StateCreator<HymnSettingsState & HymnSettingsActions> = (set) => ({
  timestampTools: false,
  audioPlayback: false,
  shouldWrapVerses: false,
  update: (key, value) => set({ [key]: value }),
});

const useHymnSettingsStore = create(persist(hymnSettingsStore, { name: "sto-hymn-settings" }));

export { useHymnSettingsStore };
