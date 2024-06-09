import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Button } from "@/components/button";
import { List, ListItem } from "@/components/list";
import { HymnSearch, HymnCard, useHymns, type HymnDisplayType } from "@/features/hymns";
import { PanelContainer } from "../shared";

function HymnPanel({ type }: { type: HymnDisplayType }) {
  const { hymnIds, add, reorganize } = useHymns(type);

  function handleSearchedHymn(id: string) {
    if (!hymnIds.includes(id)) add(id);
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
          <Switch id="audio-playback" />
        </div>
      </div>

      {hymnIds.length === 0 && (
        <i className="text-black/50">
          No hymns for {type === "SERMON_HYMNS" ? "sermon worship" : "hymnal worship"} yet
        </i>
      )}
      <List draggable onChange={reorganize}>
        {hymnIds.map((hymnId) => (
          <ListItem key={hymnId} id={String(hymnId)}>
            <HymnCard id={hymnId} type={type} />
          </ListItem>
        ))}
      </List>
    </PanelContainer>
  );
}

function SermonHymns() {
  return <HymnPanel type="SERMON_HYMNS" />;
}

function HymnalWorship() {
  return <HymnPanel type="HYMNAL_WORSHIP" />;
}

export { SermonHymns, HymnalWorship };
