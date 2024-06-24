import type { HymnId } from "~/models";
import { HymnSearch, HymnCard, useHymn, type HymnDisplayType } from "@/features/hymns";
import { PanelContainer } from "@/ui/shared";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";
import { List, ListItem } from "@/components/list";
import { useAudio } from "@/features/audio";

function HymnPanel({ type }: { type: HymnDisplayType }) {
  const { hymnIds, add, reorganize, audioPlayback, update } = useHymn(type);
  const { add: addAudio } = useAudio();

  function handleSearchedHymn(id: HymnId) {
    if (!hymnIds.includes(id)) {
      add(id);
      addAudio(id);
    }
  }

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

      {hymnIds.length === 0 && (
        <i className="text-black/50">
          No hymns for {type === "SERMON_HYMNS" ? "sermon worship" : "hymnal worship"} yet
        </i>
      )}
      <List draggable onChange={(items) => reorganize(items as HymnId[])}>
        {hymnIds.map((id) => (
          <ListItem key={id} id={String(id)}>
            <HymnCard id={id} type={type} />
          </ListItem>
        ))}
      </List>
    </PanelContainer>
  );
}

export { HymnPanel };
