import { BibleDisplay } from "@/domains/bible";
import { HymnTypeContextProvider, HymnDisplay } from "@/domains/hymns";
import { useProjectorStore } from "@/domains/projector";

function Projector() {
  const { display } = useProjectorStore();

  switch (display) {
    case "SERMON_HYMNS":
      return (
        <HymnTypeContextProvider value={{ type: "SERMON_HYMNS" }}>
          <HymnDisplay />
        </HymnTypeContextProvider>
      );
    case "HYMNAL_WORSHIP":
      return (
        <HymnTypeContextProvider value={{ type: "HYMNAL_WORSHIP" }}>
          <HymnDisplay />
        </HymnTypeContextProvider>
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
