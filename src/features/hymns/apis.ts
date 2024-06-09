import { useQuery } from "@tanstack/react-query";
import { fetchHymnById } from "~/apis/hymns";
import type { LanguageType } from "~/models";

function useHymnQuery(hymnId: string, languages: LanguageType[] = ["en"]) {
  const { data, isLoading } = useQuery({
    queryKey: ["hymns", hymnId, languages.join(",")],
    queryFn: () => fetchHymnById(hymnId, languages),
  });

  return { data, isLoading };
}

export { useHymnQuery };
