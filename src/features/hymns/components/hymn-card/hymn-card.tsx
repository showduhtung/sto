import type { HymnId } from "~/models";

import { AudioController } from "@/features/audio";
import { type HymnDisplayType, useHymn } from "../../store";
import { HymnContextProvider } from "../../context";
import { HymnController } from "./hymn-controller";

function HymnCard({ hymnId, type }: { hymnId: HymnId; type: HymnDisplayType }) {
  const { activeHymnId } = useHymn(type);
  return (
    <HymnContextProvider value={{ hymnId, type }}>
      <div className="rounded-md border border-primary/10 bg-white shadow-sm">
        <HymnController active={hymnId === activeHymnId} />
        <AudioController active={hymnId === activeHymnId} />
      </div>
    </HymnContextProvider>
  );
}

export { HymnCard };
