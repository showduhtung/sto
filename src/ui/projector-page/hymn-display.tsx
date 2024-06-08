import { cn } from "@/lib/tailwind";
import { type HymnDisplayType, useHymns } from "../../features/hymns/store";
import { useUnmount } from "@/utilities";

function HymnDisplay({ type }: { type: HymnDisplayType }) {
  const { hymnIds, activeHymnId, activeVerse, close } = useHymns(type);

  useUnmount(close);

  return hymnIds.map((id) => (
    <p
      key={id}
      className={cn("px-6 py-4", id === activeHymnId && "text-[30px] font-bold text-primary")}
    >
      {id}
      {` - ${activeVerse}`}
    </p>
  ));
}

export { HymnDisplay };
