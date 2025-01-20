import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WindowPortal } from "@/components/window";
import { useProjectorStore } from "@/domains/projector";
import { useClose } from "@/domains/shared/hooks";
import { LanguageProvider } from "@/domains/language";

import { Projector } from "./projector";
import { Controller } from "./controller";

function App() {
  const { dimensions, display } = useProjectorStore();
  const { close } = useClose();

  useEffect(() => {
    window.addEventListener("beforeunload", close);
    return () => window.removeEventListener("beforeunload", close);
  }, [close]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Controller />

        <WindowPortal open={Boolean(display)} onClose={close} {...dimensions}>
          <Projector />
        </WindowPortal>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

export { App };
