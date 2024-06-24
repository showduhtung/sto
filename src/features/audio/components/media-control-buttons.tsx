import { useRef, useState } from "react";
import { useToggle } from "react-use";
import { Pause, Play, Square, Volume, Volume2Icon } from "lucide-react";

import { ActionIcon } from "@/components/button";
import { Slider } from "@/components/slider";

function MediaControlButtons() {
  const [isPlaying, toggle] = useToggle(false);
  const [volume, setVolume] = useState(0.5);

  const secondsElapsed = useRef(0);
  const duration = useRef(0);

  return (
    <div className="flex items-center gap-4 pl-1">
      <ActionIcon onClick={toggle}>
        {isPlaying ? (
          <Pause className="h-4 w-4 fill-primary stroke-primary" />
        ) : (
          <Play className="h-4 w-4 fill-primary stroke-primary" />
        )}
      </ActionIcon>
      <ActionIcon>
        <Square className="h-4 w-4 fill-primary stroke-primary" />
      </ActionIcon>
      {secondsElapsed ? secsToTimestamp(secondsElapsed.current) : "0:00"} /{" "}
      {duration ? secsToTimestamp(duration.current) : "--"}
      <ActionIcon className="active:translate-y-[0.75px]">
        {volume === 0 ? (
          <Volume className="h-5 w-5 fill-primary stroke-primary" />
        ) : (
          <Volume2Icon className="h-5 w-5 fill-primary stroke-primary" />
        )}
      </ActionIcon>
      <div className="flex w-32 items-center gap-2">
        {volume}
        <Slider max={1} step={0.1} onValueChange={([num]) => setVolume(num)} size="sm" />
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
function timestampToSecs(timestamp: string) {
  const [minutesStr, secondsStr] = timestamp.split(":");
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);
  return minutes * 60 + seconds;
}

export { MediaControlButtons };
