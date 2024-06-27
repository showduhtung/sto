import { BibleDisplay } from "@/features/bible";
import { HymnContextProvider, HymnDisplay } from "@/features/hymns";
import { useProjector } from "@/features/projector";

function Projector() {
  const { display } = useProjector();

  switch (display) {
    case "SERMON_HYMNS":
      return (
        <HymnContextProvider value={{ type: "SERMON_HYMNS" }}>
          <HymnDisplay />
        </HymnContextProvider>
      );
    case "HYMNAL_WORSHIP":
      return (
        <HymnContextProvider value={{ type: "HYMNAL_WORSHIP" }}>
          <HymnDisplay />
        </HymnContextProvider>
      );
    case "BIBLE":
      return <BibleDisplay />;
    case "SERMON":
      return <SermonDisplay />;
    default:
      return <div>Unknown display</div>;
  }
}

function SermonDisplay() {
  return <div>Sermon</div>;
}

export { Projector };
