import { useSermonHymns, useWorshipHymns } from "@/features/hymns";
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
  const { hymnIds } = useSermonHymns();
  return <p className="px-6 py-4 text-red-400">{JSON.stringify(hymnIds, null, 2)}</p>;
}

function WorshipHymnDisplay() {
  const { hymnIds, activeHymnId } = useWorshipHymns();
  return hymnIds.map((id) => (
    <p
      key={id}
      className={cn("px-6 py-4", id === activeHymnId && "text-[30px] font-bold text-primary")}
    >
      {id}
    </p>
  ));
}

export { Projector };
