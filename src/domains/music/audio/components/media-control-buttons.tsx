import { useEffect, useState } from "react";
import { Pause, Play, Square, Volume, Volume2Icon } from "lucide-react";

import { ActionIcon } from "@/ui/components/button";
import { Slider } from "@/ui/components/slider";

import { useAudio, formatToDecimalDisplay } from "@/domains/music/audio";

function MediaControlButtons() {
  const { ref, status, duration } = useAudio();
  const [knobs, setKnobs] = useState({
    volume: 0.5,
    isPlaying: false,
    currentTime: 0,
  });
  const { volume, isPlaying, currentTime } = knobs;

  useEffect(() => {
    if (!ref.current) return;
    if (status !== "loaded") {
      setKnobs({ ...knobs, isPlaying: false, currentTime: 0 });
      return;
    }

    function handleTimeUpdate() {
      if (!ref.current) return;
      setKnobs({ ...knobs, currentTime: ref.current.currentTime });
    }

    function handleEnded() {
      setKnobs({ ...knobs, isPlaying: false, currentTime: 0 });
    }

    ref.current.addEventListener("timeupdate", handleTimeUpdate);
    ref.current.addEventListener("ended", handleEnded);

    return () => {
      const { current } = ref;
      if (!current) return;
      current.removeEventListener("timeupdate", handleTimeUpdate);
      current.removeEventListener("ended", handleEnded);
    };
  }, [ref, status, knobs]);

  return (
    <div className="flex items-center gap-2 pl-1">
      <div>
        <ActionIcon
          onClick={() => {
            if (isPlaying) ref.current?.pause();
            else ref.current?.play();
            setKnobs({ ...knobs, isPlaying: !isPlaying });
          }}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 fill-primary stroke-primary" />
          ) : (
            <Play className="h-4 w-4 fill-primary stroke-primary" />
          )}
        </ActionIcon>
        <ActionIcon
          onClick={() => {
            if (!ref.current) return;
            ref.current.currentTime = 0;
            ref.current.pause();
            setKnobs({ ...knobs, isPlaying: false, currentTime: 0 });
          }}
          disabled={!isPlaying}
        >
          <Square className="h-4 w-4 fill-primary stroke-primary" />
        </ActionIcon>
      </div>

      <div className="w-24 px-2">
        {`${secsToTimestamp(currentTime)} / ${secsToTimestamp(duration)}`}
      </div>

      <div className="flex gap-1">
        <ActionIcon className="active:translate-y-[0.75px]">
          {volume === 0 ? (
            <Volume className="h-5 w-5 fill-primary stroke-primary" />
          ) : (
            <Volume2Icon className="h-5 w-5 fill-primary stroke-primary" />
          )}
        </ActionIcon>
        <div className="flex w-32 items-center gap-2">
          {formatToDecimalDisplay(volume)}
          <Slider
            max={1}
            step={0.1}
            onValueChange={([num]) => {
              if (ref.current) ref.current.volume = num;
              setKnobs({ ...knobs, volume: num });
            }}
            defaultValue={[volume]}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}

// returns a timestamp in the format of mm:ss, where ss is 0-padded.
function secsToTimestamp(secs: number) {
  const roundedSecs = Math.floor(secs);
  const minutes = Math.floor(secs / 60);
  const seconds = String(roundedSecs % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export { MediaControlButtons };
