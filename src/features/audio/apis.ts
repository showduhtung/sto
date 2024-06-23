import { useQuery } from "@tanstack/react-query";
import { fetchAudio } from "~/apis/audio";

function useAudioQuery(hymnId: string) {
  return useQuery({
    queryKey: ["audio", hymnId],
    queryFn: () => fetchAudio(hymnId),
  });
}

export { useAudioQuery };
