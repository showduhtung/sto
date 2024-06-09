import { useProjector } from "@/features/projector";
import { HymnDisplay, BibleDisplay } from "./projector-displays";
import { useExitApp } from "@/utilities";

function Projector() {
  const { display } = useProjector();

  useExitApp();

  switch (display) {
    case "SERMON_HYMNS":
      return <HymnDisplay type="SERMON_HYMNS" />;
    case "HYMNAL_WORSHIP":
      return <HymnDisplay type="HYMNAL_WORSHIP" />;
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
