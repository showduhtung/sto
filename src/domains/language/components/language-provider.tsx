import { type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { useLanguageQuery, useLanguageStore } from "@/domains/language";

function LanguageProvider({ children }: { children: ReactNode }) {
  const { panelLanguageId } = useLanguageStore();
  const { data, isLoading } = useLanguageQuery(panelLanguageId);

  return (
    <IntlProvider locale={panelLanguageId} messages={data}>
      {isLoading ? <div></div> : children}
    </IntlProvider>
  );
}

export { LanguageProvider };
