import type { HymnId } from "~/models";
import { AudioFileModel } from "~/models/audio";

async function fetchAudio(hymnId: HymnId) {
  const response = await fetch(`server/data/audio/audio.json`, {
    cache: "force-cache",
  });
  const parsed = await response.json();

  return AudioFileModel(parsed[hymnId]);
}

export { fetchAudio };
