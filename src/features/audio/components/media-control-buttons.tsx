import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { Pause, Play, Square, Volume, Volume2Icon } from "lucide-react";

import { useHymnCardContext } from "@/features/hymns";
import { ActionIcon } from "@/components/button";
import { Slider } from "@/components/slider";

import { useAudio } from "../store";
import { convertNumberToDecimalDisplay } from "../utilities";

function MediaControlButtons() {
  const { hymnId } = useHymnCardContext();
  const { audios } = useAudio();
  const { ref, status } = audios.find((ref) => ref.hymnId === hymnId)!;

  const [volume, setVolume] = useState(0.5);
  const [isPlaying, toggle] = useToggle(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [anotherDuration, setAnotherDuration] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (status !== "loaded") return;
    setAnotherDuration(ref.current.duration);

    function handleTimeUpdate() {
      if (!ref.current) return;
      setCurrentTime(ref.current.currentTime);
    }

    function handleEnded() {
      toggle(false);
      setCurrentTime(0);
    }

    ref.current.addEventListener("timeupdate", handleTimeUpdate);
    ref.current.addEventListener("ended", handleEnded);

    return () => {
      const { current } = ref;
      if (!current) return;
      current.removeEventListener("timeupdate", handleTimeUpdate);
      current.removeEventListener("ended", handleEnded);
    };
  }, [ref, toggle, status]);

  return (
    <div className="flex items-center gap-2 pl-1">
      <div>
        <ActionIcon
          onClick={() => {
            if (isPlaying) ref.current?.pause();
            else ref.current?.play();
            toggle(!isPlaying);
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
            toggle(false);
          }}
          disabled={!isPlaying}
        >
          <Square className="h-4 w-4 fill-primary stroke-primary" />
        </ActionIcon>
      </div>

      <div className="w-24 px-2">
        {`${secsToTimestamp(currentTime)} / ${secsToTimestamp(anotherDuration)}`}
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
          {convertNumberToDecimalDisplay(volume)}
          <Slider
            max={1}
            step={0.1}
            onValueChange={([num]) => {
              if (ref.current) ref.current.volume = num;
              setVolume(num);
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
