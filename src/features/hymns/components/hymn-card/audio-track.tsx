import { Checkbox } from "@/components/checkbox";
import { Label } from "@/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { cn } from "@/lib/tailwind";
import { useHymns, type HymnDisplayType } from "../../store";

function AudioTrack({
  className,
  type,
}: React.HTMLAttributes<HTMLDivElement> & { type: HymnDisplayType }) {
  const { activeHymnId: _activeHymnId } = useHymns(type);

  return (
    <div className="flex flex-col gap-4">
      <div className={cn("flex items-center gap-2 rounded-sm bg-zinc-100", className)}>
        <Select defaultValue="piano">
          <SelectTrigger className="h-8 w-24 focus:ring-0 focus:ring-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-24 min-w-24">
            <SelectItem value="piano">Piano</SelectItem>
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

export { AudioTrack };
