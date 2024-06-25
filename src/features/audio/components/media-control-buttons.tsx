import { useEffect, useRef, useState } from "react";
import { useToggle } from "react-use";
import { Pause, Play, Square, Volume, Volume2Icon } from "lucide-react";

import { useHymnContext } from "@/features/hymns";
import { ActionIcon } from "@/components/button";
import { Slider } from "@/components/slider";

import { useAudio } from "../store";
import { convertNumberToDecimalDisplay } from "../utilities";

function MediaControlButtons() {
  const { hymnId, type } = useHymnContext();
  const { audios } = useAudio(type);
  const { ref, status } = audios.find((ref) => ref.hymnId === hymnId)!;

  const [volume, setVolume] = useState(0.5);
  const [isPlaying, toggle] = useToggle(false);

  const secondsElapsed = useRef(0);
  const duration = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    if (status !== "loaded") return;

    // synchronizes audio ref with media player state

    function updateCurrentTime() {
      // updateSecsElapsed(ref.current.currentTime);
    }
    function storeMetadata() {
      // notifyMetadataLoaded({
      //   duration: ref.current.duration,
      // });
    }

    function play() {
      toggle(true);
    }
    function pause() {
      toggle(false);
    }

    function stop() {
      toggle(false);
    }

    ref.current.addEventListener("play", play);
    ref.current.addEventListener("pause", pause);
    ref.current.addEventListener("timeupdate", updateCurrentTime);

    ref.current.addEventListener("ended", stop);

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener("timeupdate", updateCurrentTime);
      ref.current.removeEventListener("play", play);
      ref.current.removeEventListener("pause", pause);
      ref.current.removeEventListener("ended", stop);
    };
  }, [ref, toggle, status]);

  return (
    <div className="flex items-center gap-2 pl-1">
      <div>
        <ActionIcon
          onClick={() => {
            if (isPlaying) ref.current?.pause();
            else ref.current?.play();
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
          }}
        >
          <Square className="h-4 w-4 fill-primary stroke-primary" />
        </ActionIcon>
      </div>

      <div className="px-2">
        {secondsElapsed ? secsToTimestamp(secondsElapsed.current) : "0:00"} /{" "}
        {duration ? secsToTimestamp(duration.current) : "--"}
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

// Assumes timestamp in the format of mm:ss
function _timestampToSecs(timestamp: string) {
  const [minutesStr, secondsStr] = timestamp.split(":");
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);
  return minutes * 60 + seconds;
}

export { MediaControlButtons };
