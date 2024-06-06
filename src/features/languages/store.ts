import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import type { LanguageId } from "./utilities";

type _LanguageActions = {
  update: <T extends keyof LanguageState>(key: T, value: LanguageState[T]) => void;
};

type LanguageState = {
  bilingual: boolean;
  primaryLanguageId: LanguageId;
  secondaryLanguageId: LanguageId | undefined;
  panelLanguageId: LanguageId;
};

const languageStore: StateCreator<LanguageState & _LanguageActions> = (set) => ({
  bilingual: true,
  primaryLanguageId: "en",
  secondaryLanguageId: undefined,
  panelLanguageId: "en",
  update: (key, value) => set({ [key]: value }),
});

const useLanguages = create(persist(languageStore, { name: "languages" }));

export type { LanguageState };
export { useLanguages };
