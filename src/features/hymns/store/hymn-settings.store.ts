import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type HymnSettingsState = {
  shouldWrapVerses: boolean; // if bilingual and incongruent number of verses, should wrap verses?
};
type HymnSettingsActions = { toggleWrapVerses: () => void };

const hymnSettingsStore: StateCreator<HymnSettingsState & HymnSettingsActions> = (set) => ({
  shouldWrapVerses: false,
  toggleWrapVerses: () => set(({ shouldWrapVerses }) => ({ shouldWrapVerses: !shouldWrapVerses })),
});

const useHymnSettings = create(persist(hymnSettingsStore, { name: "hymn-settings" }));

export { useHymnSettings };
