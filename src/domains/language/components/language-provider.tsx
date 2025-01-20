import { type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { useLanguageQuery, useLanguageStore } from "@/domains/language";

function LanguageProvider({ children }: { children: ReactNode }) {
  const { panelLanguageId } = useLanguageStore();
  const { data } = useLanguageQuery(panelLanguageId);

  return (
    <IntlProvider locale={panelLanguageId} messages={data}>
      {children}
    </IntlProvider>
  );
}

export { LanguageProvider };
