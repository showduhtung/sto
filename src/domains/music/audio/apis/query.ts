import { useQuery } from "@tanstack/react-query";
import { useMusicController } from "@/domains/music/shared";
import { fetchAudio } from "./audio.service";

function useAudioQuery() {
  const { hymnId } = useMusicController();

  return useQuery({
    queryKey: ["audio", hymnId],
    queryFn: () => fetchAudio(hymnId),
  });
}

export { useAudioQuery };
