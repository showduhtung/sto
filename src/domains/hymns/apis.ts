import { useQuery } from "@tanstack/react-query";
import { fetchHymnById } from "~/apis/hymns";
import type { HymnId, LanguageType } from "~/models";

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

export { useHymnQuery };
