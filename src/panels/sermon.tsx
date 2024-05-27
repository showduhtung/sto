import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Switch } from "@/components/switch";
import { Textarea } from "@/components/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import { PlusIcon } from "lucide-react";
import { useMedia } from "react-use";

function SermonPanel() {
  const isLarge = useMedia("(min-width: 1024px)");
  if (!isLarge) return <SermonPanelTabs />;
  return (
    <div className="flex flex-col gap-4">
      <SermonForm />
      <SermonLineup />
      <SermonPreview />
    </div>
  );
}

function SermonPanelTabs() {
  return (
    <Tabs className="flex flex-1 flex-col" defaultValue="form">
      <TabsList>
        <TabsTrigger value="form">Sermon Information</TabsTrigger>
        <TabsTrigger value="sermon_lineup">Lineup</TabsTrigger>
        <TabsTrigger value="bible">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <SermonForm />
      </TabsContent>
      <TabsContent value="sermon_lineup">
        <SermonLineup />
      </TabsContent>
      <TabsContent value="bible">SermonPreview</TabsContent>
    </Tabs>
  );
}

function SermonForm() {
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="sermon-title">Sermon Title</Label>
          <Textarea id="sermon-title" rows={1} />
        </div>
        <div>
          <Label htmlFor="sermon-title-translation">Title Translation</Label>
          <Textarea id="sermon-title-translation" rows={1} />
        </div>
        <div>
          <Label htmlFor="sermon-subtitle">Subtitle</Label>
          <Textarea id="sermon-subtitle" rows={1} />
        </div>
        <div>
          <Label htmlFor="sermon-subtitle-translation">Subtitle Translation</Label>
          <Textarea id="sermon-subtitle-translation" rows={1} />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="ghost" size="xs">
          Clear
        </Button>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="subtitle-switch">Subtitle</Label>
            <Switch id="subtitle-switch" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="footer-text-switch">Footer Text</Label>
            <Switch id="footer-text-switch" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SermonLineup() {
  return (
    <div className="py-2">
      <div className="flex justify-between">
        <p>Sermon Lineup (5)</p>
        <div className="flex gap-1">
          <Button variant="ghost" size="xxs">
            Clear
          </Button>
          <Button variant="outline" size="xxs" className="flex gap-2 border-primary px-2">
            <PlusIcon height="12" width="12" className="text-primary" />
            <p className="text-primary">Add to lineup</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SermonPreview() {
  return <div className="py-2">Sermon Preview</div>;
}

export { SermonPanel };
