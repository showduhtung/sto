import { useQuery } from "@tanstack/react-query";
import { useHymnContext } from "@/domains/hymns";
import { fetchAudio } from "./audio.service";

function useAudioQuery() {
  const { hymnId } = useHymnContext();

  return useQuery({
    queryKey: ["audio", hymnId],
    queryFn: () => fetchAudio(hymnId),
  });
}

export { useAudioQuery };
