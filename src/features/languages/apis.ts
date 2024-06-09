import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchLanguage } from "~/apis/languages";
import type { DialectType } from "~/models";

function useLanguageQuery(language: DialectType = "en") {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["intl", language],
    queryFn: () => fetchLanguage(language),
  });

  return { data, isLoading };
}

export { useLanguageQuery };
