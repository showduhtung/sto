import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";
import { List, ListItem } from "@/components/list";
import { HymnSearch, HymnCard, useWorshipHymns } from "@/features/hymns";

import { PanelContainer } from "../shared";
import { useProjector } from "@/features/projector";

function HymnalWorship() {
  const { hymnIds, update, activeHymnId, setVerse, activeVerse } = useWorshipHymns();
  const { toggle } = useProjector();

  function handleSearchedHymn(id: string) {
    if (hymnIds.includes(id)) return;
    update("hymnIds", [...hymnIds, id]);
  }

  function handleVerseClicked(hymnId: string, verse: number) {
    setVerse(hymnId, verse);
    toggle("HYMNAL_WORSHIP");
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
        <div className="flex items-center gap-2 md:gap-1">
          <Label htmlFor="audio-playback">Audio Playback</Label>
          <Switch id="audio-playback" />
        </div>
      </div>

      {hymnIds.length === 0 && <i className="text-black/50">No hymns for hymnal worship yet</i>}
      <List draggable onChange={(newHymnIds) => update("hymnIds", newHymnIds)}>
        {hymnIds.map((hymnId) => (
          <ListItem key={hymnId} id={String(hymnId)}>
            <HymnCard
              id={hymnId}
              active={activeHymnId === hymnId}
              onVerse={handleVerseClicked}
              activeVerse={activeVerse}
              onRemove={() =>
                update(
                  "hymnIds",
                  hymnIds.filter((id) => id !== hymnId),
                )
              }
            />
          </ListItem>
        ))}
      </List>
    </PanelContainer>
  );
}

export { HymnalWorship };
