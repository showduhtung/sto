import { Settings } from "lucide-react";

import { HymnalWorship, SermonPanel, SermonHymns } from "./panels";
import { Button } from "@/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";

function Controller() {
  return (
    <div className="flex h-screen flex-col gap-2 px-6 py-4">
      <div className="flex items-center justify-between">
        <img src="./logo.png" className="h-9" />
        <div className="flex items-center gap-2">
          <Button variant="text" size="sm">
            Select a tutorial
          </Button>
          <Button variant="text" className="flex gap-2" size="sm">
            <Settings width="18" height="18" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex grow flex-col items-stretch gap-8 rounded-sm border border-primary px-4 py-2 lg:flex-row">
        <Tabs className="flex flex-1 flex-col" defaultValue="hymnal_worship">
          <TabsList>
            <TabsTrigger value="hymnal_worship">Hymnal Worship</TabsTrigger>
            <TabsTrigger value="sermon_hymns">Sermon Hymns</TabsTrigger>
            <TabsTrigger value="bible">Bible</TabsTrigger>
            <TabsTrigger value="slides">Slides</TabsTrigger>
          </TabsList>
          <TabsContent value="hymnal_worship">
            <HymnalWorship />
          </TabsContent>
          <TabsContent value="sermon_hymns">
            <SermonHymns />
          </TabsContent>
          <TabsContent value="bible">
            <BibleContent />
          </TabsContent>
          <TabsContent value="slides">
            <SlidesContent />
          </TabsContent>
        </Tabs>
        <div className="flex flex-1 flex-col">
          <SermonPanel />
        </div>
      </div>
      <div className="h-9">
        <Button variant="outline" size="sm" disabled>
          Turn off
        </Button>
      </div>
    </div>
  );
}
function BibleContent() {
  return <div>Bible</div>;
}
function SlidesContent() {
  return <div>Slides</div>;
}

export { Controller };
