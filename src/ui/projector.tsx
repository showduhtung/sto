import { useHymns } from "@/features/hymns";
import { useProjector } from "@/features/projector";
import { cn } from "@/lib/tailwind";

function Projector() {
  const { display } = useProjector();

  switch (display) {
    case "SERMON_HYMNS":
      return <SermonHymnDisplay />;
    case "HYMNAL_WORSHIP":
      return <WorshipHymnDisplay />;
    default:
      return <div>Unknown display</div>;
  }
}

function SermonHymnDisplay() {
  const { hymnIds, activeHymnId, activeVerse } = useHymns("SERMON_HYMNS");
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

function WorshipHymnDisplay() {
  const { hymnIds, activeHymnId, activeVerse } = useHymns("HYMNAL_WORSHIP");
  const { display } = useProjector();
  return hymnIds.map((id) => (
    <p
      key={id}
      className={cn("px-6 py-4", id === activeHymnId && "text-[30px] font-bold text-primary")}
    >
      {id}
      {` - ${activeVerse}`}
      {JSON.stringify({ display, activeHymnId })}
    </p>
  ));
}

export { Projector };
