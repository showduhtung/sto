import type { HymnId } from "~/models";
import { HymnSearch, HymnCard, useHymn, useHymnContext } from "@/features/hymns";
import { PanelContainer } from "@/ui/shared";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";
import { List, ListItem } from "@/components/list";
import { useBaseAudio } from "@/features/audio";
import { useEffect } from "react";

function HymnPanel() {
  const { type } = useHymnContext();
  const { hymnIds, add, reorganize, audioPlayback, update } = useHymn();
  const { add: addAudio, audios } = useBaseAudio(type);

  function handleSearchedHymn(id: HymnId) {
    if (!hymnIds.includes(id)) {
      add(id);
      addAudio(id);
    }
  }

  useEffect(() => {
    // check if all audios are loaded
    // this useEffect is necessary because hymns are persisted in localStorage, but audios are not
    const allLoaded = audios.length === hymnIds.length;
    if (allLoaded) return;
    addAudio(hymnIds.filter((id) => !audios.find(({ hymnId }) => hymnId === id)));
  }, [audios, hymnIds, addAudio]);

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
