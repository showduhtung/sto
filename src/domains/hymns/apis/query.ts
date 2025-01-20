import { useQuery } from "@tanstack/react-query";
import type { HymnId, LanguageType } from "~/models";
import { fetchHymnById, fetchHymnTitles } from "./hymns.service";

type HymnQueryProps = {
  hymnId: HymnId;
  languages?: LanguageType[];
  enabled?: boolean;
};

function useHymnQuery({ hymnId, languages = ["en"], enabled }: HymnQueryProps) {
  return useQuery({
    queryKey: ["hymns", hymnId, languages.join(",")],
    queryFn: () => fetchHymnById(hymnId, languages),
    enabled,
  });
}

function useHymnTitlesQuery({ language = "en" }: { language: LanguageType }) {
  return useQuery({
    queryKey: ["hymn-titles"],
    queryFn: () => fetchHymnTitles(language),
  });
}

export { useHymnQuery, useHymnTitlesQuery };
