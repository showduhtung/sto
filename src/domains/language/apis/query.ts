import { useSuspenseQuery } from "@tanstack/react-query";
import type { DialectType } from "~/models";
import { fetchLanguage } from "./languages.service";

function useLanguageQuery(language: DialectType = "en") {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["intl", language],
    queryFn: () => fetchLanguage(language),
  });

  return { data, isLoading };
}

export { useLanguageQuery };
