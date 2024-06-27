import { createContext, useContext } from "react";

function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null);

  function useSafeContext() {
    const ctx = useContext(Context);
    if (ctx === null) throw new Error(errorMessage);

    return ctx;
  }

  const Provider = ({ children, value }: { value: ContextValue; children: React.ReactNode }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useSafeContext] as const;
}

export { createSafeContext };
