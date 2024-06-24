import { useRef, useState } from "react";
import { useToggle } from "react-use";
import { Pause, Play, Square, Volume, Volume2Icon } from "lucide-react";
import { cn } from "@/lib/tailwind";

import { Checkbox } from "@/components/checkbox";
import { Label } from "@/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { ActionIcon } from "@/components/button";
import { Slider } from "@/components/slider";

import { useHymn, useHymnContext } from "@/features/hymns";
import { useAudioQuery } from "../apis";

function TrackSettings() {
  const { id, type } = useHymnContext();
  const { data, isLoading } = useAudioQuery(id);

  const { hymnIds } = useHymn(type);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue={data[0].name}>
        <SelectTrigger className="h-8 w-40 focus:ring-0 focus:ring-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-24">
          {data.map(({ name }) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue="1.0">
        <SelectTrigger className="h-8 w-20 focus:ring-0 focus:ring-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-24 min-w-24">
          {speedOptions.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2 pl-4">
        <Label htmlFor="audio-sync">Sync with Audio</Label>
        <Checkbox id="audio-sync" defaultChecked={true} />
      </div>
    </div>
  );
}

function AudioButtons() {
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

function AudioTrack({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { type } = useHymnContext();
  const { activeHymnId: _activeHymnId } = useHymn(type);

  return (
    <div className={cn("flex flex-col gap-4 rounded-sm bg-zinc-100 px-4 pb-2 pt-4", className)}>
      <TrackSettings />
      <AudioButtons />
    </div>
  );
}

const speedOptions = [
  { value: "0.6", label: "0.6x" },
  { value: "0.7", label: "0.7x" },
  { value: "0.8", label: "0.8x" },
  { value: "0.9", label: "0.9x" },
  { value: "1.0", label: "1.0x" },
  { value: "1.1", label: "1.1x" },
  { value: "1.2", label: "1.2x" },
  { value: "1.3", label: "1.3x" },
  { value: "1.4", label: "1.4x" },
  { value: "1.5", label: "1.5x" },
  { value: "1.7", label: "1.7x" },
  { value: "2.0", label: "2.0x" },
];

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

export { AudioTrack, AudioButtons, TrackSettings };
