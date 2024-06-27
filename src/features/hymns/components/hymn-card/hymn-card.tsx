import type { HymnId } from "~/models";

import { AudioController } from "@/features/audio";
import { useHymn } from "../../store";
import { HymnCardContextProvider } from "../../context";
import { HymnController } from "./hymn-controller";

function HymnCard({ hymnId }: { hymnId: HymnId }) {
  const { activeHymnId } = useHymn();
  return (
    <HymnCardContextProvider value={{ hymnId }}>
      <div className="rounded-md border border-primary/10 bg-white shadow-sm">
        <HymnController active={hymnId === activeHymnId} />
        <AudioController active={hymnId === activeHymnId} />
      </div>
    </HymnCardContextProvider>
  );
}

export { HymnCard };
