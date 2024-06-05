import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import type { LanguageId } from "./utilities";

type _LanguageActions = {
  // hi: "hellol";
};

type LanguageState = {
  bilingual: boolean;
  primaryLanguageId: LanguageId;
  secondaryLanguageId: LanguageId | undefined;
};

const languageStore: StateCreator<LanguageState & _LanguageActions> = (set) => ({
  bilingual: false,
  primaryLanguageId: "en",
  secondaryLanguageId: undefined,
});

const useLanguages = create(persist(languageStore, { name: "languages" }));

export { useLanguages };
