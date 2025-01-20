import { useCallback, useState } from "react";
import { createSafeContext } from "@/utilities";

function useSubscription() {
  const [values, setValues] = useState<string[]>([]);

  const subscribe = useCallback((value: string, idx?: number) => {
    setValues((prev) => {
      const newValues = [...prev];
      // ordered subscription
      if (idx !== undefined) newValues[idx] = value;
      else newValues.push(value);

      return newValues;
    });
  }, []);

  const unsubscribe = useCallback(
    (value: string) => setValues((prev) => prev.filter((val) => val !== value)),
    [],
  );

  return { values, subscribe, unsubscribe, update: setValues };
}

type SubscriptionContextType = {
  subscribe: (value: string, idx?: number) => void;
  unsubscribe: (value: string) => void;
  index?: number;
};

const [SubscriptionProvider, useSubscriptionProvider] =
  createSafeContext<SubscriptionContextType>("Error message");

export { useSubscription, SubscriptionProvider, useSubscriptionProvider };
