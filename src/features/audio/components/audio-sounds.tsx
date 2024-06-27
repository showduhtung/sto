import { useAudioQuery } from "../apis";
import { useAudio } from "../context";

function AudioSound() {
  const { data: tracks, isLoading } = useAudioQuery();
  const { ref, activeTrackIdx, update } = useAudio();

  if (isLoading) return <div>Loading...</div>;
  if (!tracks) return <div>Not found</div>;

  const { url } = tracks[activeTrackIdx];

  return (
    <audio
      key={url}
      ref={ref}
      src={url}
      preload="auto"
      onLoadedMetadata={() => update("status", "loaded")}
    />
  );
}

export { AudioSound };
