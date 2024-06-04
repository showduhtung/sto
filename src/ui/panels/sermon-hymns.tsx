import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";
import { List, ListItem } from "@/components/list";
import { HymnSearch, HymnCard, useSermonHymns } from "@/features/hymns";
import { useProjector } from "@/features/projector";

import { PanelContainer } from "../shared";

function SermonHymns() {
  const { hymnIds, update: updateHymns, activeHymnId, setVerse, activeVerse } = useSermonHymns();
  const { toggle } = useProjector();

  function handleSearchedHymn(id: string) {
    if (hymnIds.includes(id)) return;
    updateHymns("hymnIds", [...hymnIds, id]);
  }
  function handleVerseClicked(hymnId: string, verse: number) {
    setVerse(hymnId, verse);
    toggle("SERMON_HYMNS");
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

      {hymnIds.length === 0 && <i className="text-black/50">No hymns for hymnal woship yet</i>}
      <List draggable onChange={(newHymnIds) => updateHymns("hymnIds", newHymnIds)}>
        {hymnIds.map((hymnId) => (
          <ListItem key={hymnId} id={String(hymnId)}>
            <HymnCard
              id={hymnId}
              active={activeHymnId === hymnId}
              onVerse={handleVerseClicked}
              activeVerse={activeVerse}
              onRemove={() =>
                updateHymns(
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

export { SermonHymns };
