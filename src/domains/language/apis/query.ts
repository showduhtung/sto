import { useQuery } from "@tanstack/react-query";
import type { DialectType } from "~/models";
import { fetchLanguage } from "./languages.service";

function useLanguageQuery(language: DialectType = "en") {
  const { data, isLoading } = useQuery({
    queryKey: ["intl", language],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return fetchLanguage(language);
    },
  });

  return { data, isLoading };
}

export { useLanguageQuery };
