import { useState } from "react";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { HymnSearch } from "@/features/hymns/components";
import { PanelContainer } from "@/ui";
import { Button } from "@/components/button";

function HymnalWorship() {
  const [selectedHymnIds, setSelectedHymnIds] = useState<string[]>([]);

  function handleSearchedHymn(id: string) {
    setSelectedHymnIds((prev) => [...prev, id]);
  }

  return (
    <PanelContainer className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div>
            <Label htmlFor="hymn-search" className="sr-only">
              Hymn Search
            </Label>
            <HymnSearch id="hymn-search" onChange={handleSearchedHymn} />
          </div>
          <Button variant="ghost" size="xxs" className="px-2">
            Clear
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="audio-playback">Audio Playback</Label>
          <Switch id="audio-playback" />
        </div>
      </div>

      {selectedHymnIds.length === 0 && (
        <i className="text-black/50">No hymns for hymnal woship yet</i>
      )}

      <ul>
        {selectedHymnIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </PanelContainer>
  );
}

export { HymnalWorship };
