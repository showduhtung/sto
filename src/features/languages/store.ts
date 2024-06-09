import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { languageMap, type RegionalLanguageId } from "./utilities";

type _LanguageActions = {
  update: <T extends keyof LanguageState>(key: T, value: LanguageState[T]) => void;
};

type LanguageState = {
  bilingual: boolean;
  primaryLanguageId: RegionalLanguageId;
  secondaryLanguageId: RegionalLanguageId;
  panelLanguageId: RegionalLanguageId;
};

const languageStore: StateCreator<LanguageState & _LanguageActions> = (set) => ({
  bilingual: false,
  primaryLanguageId: "en",
  secondaryLanguageId: "zh",
  panelLanguageId: "en",
  update: (key, value) => set({ [key]: value }),
});

const useLanguagesStore = create(persist(languageStore, { name: "languages" }));

const useLanguages = () => {
  const store = useLanguagesStore();
  const { primaryLanguageId, secondaryLanguageId, bilingual } = store;

  const languages = bilingual
    ? [languageMap[primaryLanguageId], languageMap[secondaryLanguageId]]
    : [languageMap[primaryLanguageId]];

  return { ...store, languages };
};

export type { LanguageState };
export { useLanguages };
