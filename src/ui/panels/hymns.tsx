import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";
import { List, ListItem } from "@/components/list";
import { HymnSearch, HymnCard, useSermonHymns, useWorshipHymns } from "@/features/hymns";
import { useProjector } from "@/features/projector";

import { PanelContainer } from "../shared";

type HymnPanelProps = {
  onSearch: (id: string) => void;
  onSort: (values: string[]) => void;
  onVerse: (hymnId: string, verse: number) => void;
  onRemove: (id: string) => void;
  title: string;
  hymns: string[];
  activeHymnId: string;
  activeVerse: number;
};

function HymnPanel({
  onSearch,
  onSort,
  onVerse,
  title,
  hymns,
  activeVerse,
  activeHymnId,
  onRemove,
}: HymnPanelProps) {
  return (
    <PanelContainer className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div>
            <Label htmlFor="hymn-search" className="sr-only">
              Hymn Search
            </Label>
            <HymnSearch id="hymn-search" onChange={onSearch} />
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

      {hymns.length === 0 && (
        <i className="text-black/50">No hymns for {title.toLowerCase()} yet</i>
      )}
      <List draggable onChange={onSort}>
        {hymns.map((hymnId) => (
          <ListItem key={hymnId} id={String(hymnId)}>
            <HymnCard
              id={hymnId}
              active={activeHymnId === hymnId}
              onVerse={onVerse}
              activeVerse={activeVerse}
              onRemove={() => onRemove(hymnId)}
            />
          </ListItem>
        ))}
      </List>
    </PanelContainer>
  );
}

function SermonHymns() {
  const { update, setVerse, hymnIds, activeHymnId, activeVerse } = useSermonHymns();
  const { toggle, display } = useProjector();

  function handleSearchedHymn(id: string) {
    if (hymnIds.includes(id)) return;
    update("hymnIds", [...hymnIds, id]);
  }
  function handleVerseClicked(hymnId: string, verse: number) {
    setVerse(hymnId, verse);
    toggle("SERMON_HYMNS");
  }

  function handleRemove(targetId: string) {
    update(
      "hymnIds",
      hymnIds.filter((id) => id !== targetId),
    );
  }

  return (
    <HymnPanel
      onSearch={handleSearchedHymn}
      onVerse={handleVerseClicked}
      onRemove={handleRemove}
      hymns={hymnIds}
      activeHymnId={display === "SERMON_HYMNS" ? activeHymnId : ""}
      activeVerse={display === "SERMON_HYMNS" ? activeVerse : -1}
      onSort={(sortedHymns) => update("hymnIds", sortedHymns)}
      title="Sermon Hymns"
    />
  );
}

function HymnalWorship() {
  const { hymnIds, update, activeHymnId, setVerse, activeVerse } = useWorshipHymns();
  const { toggle, display } = useProjector();

  function handleSearch(id: string) {
    if (hymnIds.includes(id)) return;
    update("hymnIds", [...hymnIds, id]);
  }
  function handleVerse(hymnId: string, verse: number) {
    setVerse(hymnId, verse);
    toggle("SERMON_HYMNS");
  }

  function handleRemove(targetId: string) {
    update(
      "hymnIds",
      hymnIds.filter((id) => id !== targetId),
    );
  }

  return (
    <HymnPanel
      onSearch={handleSearch}
      onVerse={handleVerse}
      onRemove={handleRemove}
      hymns={hymnIds}
      activeHymnId={display === "HYMNAL_WORSHIP" ? activeHymnId : ""}
      activeVerse={display === "HYMNAL_WORSHIP" ? activeVerse : -1}
      onSort={(sortedHymns) => update("hymnIds", sortedHymns)}
      title="Hymnal Worship"
    />
  );
}

export { SermonHymns, HymnalWorship };
