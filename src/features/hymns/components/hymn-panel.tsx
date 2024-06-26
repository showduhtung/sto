import type { HymnId } from "~/models";
import { HymnSearch, HymnCard, useHymn, useHymnTypeContext } from "@/features/hymns";
import { useAudios } from "@/features/audio";

import { PanelContainer } from "@/ui/shared";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";
import { List, ListItem } from "@/components/list";
import { useEffect } from "react";

function HymnPanel() {
  const { type } = useHymnTypeContext();
  const { hymnIds, add, reorganize, audioPlayback, update } = useHymn();
  const { audios, add: addAudio, initialize } = useAudios();

  function handleSearchedHymn(id: HymnId) {
    if (!hymnIds.includes(id)) {
      add(id);
      addAudio(id);
    }
  }
  useEffect(() => {
    if (audios.length === hymnIds.length) return;
    initialize(hymnIds);
  }, [audios, hymnIds, initialize]);

  return (
    <PanelContainer className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Label htmlFor="hymn-search" className="sr-only">
            Hymn Search
          </Label>
          <HymnSearch id="hymn-search" onChange={handleSearchedHymn} />
          <Button variant="text" size="xxs">
            Clear
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="audio-playback">Audio Playback</Label>
          <Switch
            id="audio-playback"
            checked={audioPlayback}
            onCheckedChange={(checked) => update("audioPlayback", checked)}
          />
        </div>
      </div>

      {!hymnIds.length && (
        <i className="text-black/50">
          No hymns for {type === "SERMON_HYMNS" ? "sermon worship" : "hymnal worship"} yet
        </i>
      )}
      {Boolean(hymnIds.length) && !audios.length && (
        <i className="text-black/50">
          Audios for {type === "SERMON_HYMNS" ? "sermon worship" : "hymnal worship"} are still
          loading...
        </i>
      )}

      {Boolean(hymnIds.length) && Boolean(audios.length) && (
        <List draggable onChange={(items) => reorganize(items as HymnId[])}>
          {hymnIds.map((id) => (
            <ListItem key={id} id={String(id)}>
              <HymnCard hymnId={id} />
            </ListItem>
          ))}
        </List>
      )}
    </PanelContainer>
  );
}

export { HymnPanel };
