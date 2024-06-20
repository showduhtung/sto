import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { languageMap } from "./utilities";
import type { DialectType } from "~/models";

type LanguageActions = {
  update: <T extends keyof LanguageState>(key: T, value: LanguageState[T]) => void;
};

type LanguageState = {
  bilingual: boolean;
  primaryLanguageId: DialectType;
  secondaryLanguageId: DialectType;
  panelLanguageId: DialectType;
};

const languageStore: StateCreator<LanguageState & LanguageActions> = (set) => ({
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
  const [primary, secondary] = [languageMap[primaryLanguageId], languageMap[secondaryLanguageId]];

  const languages = bilingual ? [primary, secondary] : [primary];

  return { ...store, languages };
};

export type { LanguageState };
export { useLanguages };
