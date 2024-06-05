import { HymnalWorship, SermonPanel, SermonHymns } from "./panels";
import { Button } from "@/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import { SettingsModal } from "./settings-modal";

const tabs = [
  { value: "hymnal_worship", label: "Hymnal Worship", content: <HymnalWorship /> },
  { value: "sermon_hymns", label: "Sermon Hymns", content: <SermonHymns /> },
  { value: "bible", label: "Bible", content: <BibleContent /> },
  { value: "slides", label: "Slides", content: <SlidesContent /> },
];

function Controller() {
  return (
    <div className="flex h-screen flex-col gap-2 px-6 py-4">
      <div className="flex items-center justify-between">
        <img src="./logo.png" className="h-9" />
        <div className="flex items-center gap-2">
          <Button variant="text" size="sm">
            Select a tutorial
          </Button>
          <SettingsModal />
        </div>
      </div>

      <div className="flex grow flex-col items-stretch gap-8 rounded-sm border border-primary px-4 py-2 lg:flex-row">
        <Tabs className="flex flex-1 flex-col" defaultValue="hymnal_worship">
          <TabsList>
            {tabs.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map(({ value, content }) => (
            <TabsContent key={value} value={value}>
              {content}
            </TabsContent>
          ))}
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
