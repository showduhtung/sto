import { useState } from "react";

import { HymnSearch } from "@/features/hymns/components";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";

import { List, ListItem } from "@/components/list";
import { PanelContainer } from "../shared";
import { HymnCard } from "@/features/hymns/components/hymn-card";

function HymnalWorship() {
  const [selectedHymnIds, setSelectedHymnIds] = useState<string[]>([]);

  function handleSearchedHymn(id: string) {
    if (selectedHymnIds.includes(id)) return;
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
          <Button variant="text" size="xxs">
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
      <List draggable onChange={setSelectedHymnIds}>
        {selectedHymnIds.map((hymnId) => (
          <ListItem key={hymnId} id={String(hymnId)}>
            <HymnCard id={hymnId} />
          </ListItem>
        ))}
      </List>
    </PanelContainer>
  );
}

export { HymnalWorship };
