import { startTransition, Suspense, useEffect, useState, type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { useLanguageQuery, useLanguage } from "@/domains/language";
import type { DialectType } from "~/models";

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<DialectType>("en");
  const { panelLanguageId } = useLanguage();

  const { data } = useLanguageQuery(lang);

  useEffect(() => {
    // A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.

    // https://tanstack.com/query/latest/docs/framework/react/guides/suspense#suspense
    startTransition(() => setLang(panelLanguageId));
  }, [panelLanguageId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntlProvider locale={panelLanguageId} messages={data}>
        {children}
      </IntlProvider>
    </Suspense>
  );
}

export { LanguageProvider };
