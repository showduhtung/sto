import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAudio, useAudioQuery, formatToDecimalDisplay } from "@/domains/music/audio";

function TrackSettings() {
  const [playbackRate, setPlaybackRate] = useState(1);
  const { activeTrackIdx, ref, update } = useAudio();
  const { data, isLoading } = useAudioQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No audio found</div>;

  function handleTrackChange(val: string) {
    update("status", "loading");
    update("activeTrackIdx", Number(val));
  }

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue={String(activeTrackIdx)} onValueChange={handleTrackChange}>
        <SelectTrigger className="h-8 w-40 focus:ring-0 focus:ring-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-24">
          {data.map(({ name }, idx) => (
            <SelectItem key={name} value={String(idx)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={formatToDecimalDisplay(playbackRate)}
        onValueChange={(val) => {
          if (ref.current) ref.current.playbackRate = Number(val);
          setPlaybackRate(Number(val));
        }}
      >
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
        <Label className="text-black/50" htmlFor="audio-sync">
          Sync with Audio
        </Label>
        <Checkbox id="audio-sync" defaultChecked={false} disabled />
      </div>
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

export { TrackSettings };
