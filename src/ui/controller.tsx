import { Button } from "@/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";

import { useProjector, useClose } from "@/features/projector";
import { HymnPanel } from "@/features/hymns";
import { BibleSelector } from "@/features/bible";
import { SermonPanel } from "@/features/sermon";

import { SettingsModal } from "./settings-modal";

const tabs = [
  {
    value: "hymnal_worship",
    label: "Hymnal Worship",
    content: <HymnPanel type="HYMNAL_WORSHIP" />,
  },
  { value: "sermon_hymns", label: "Sermon Hymns", content: <HymnPanel type="SERMON_HYMNS" /> },
  { value: "bible", label: "Bible", content: <BibleSelector /> },
  { value: "slides", label: "Slides", content: <SlidesContent /> },
];

function Controller() {
  const { display } = useProjector();
  const { close } = useClose();

  return (
    <div className="flex h-screen flex-col gap-2 px-6 py-4">
      <div className="flex items-center justify-between">
        <img src="./logo.png" className="h-9" alt="true jesus church" />
        <div className="flex items-center gap-2">
          <Button variant="text" size="sm">
            Select a tutorial
          </Button>
          <SettingsModal />
        </div>
      </div>

      <div className="flex grow flex-col items-stretch gap-8 rounded-sm border border-primary px-4 py-2 lg:flex-row">
        <Tabs className="flex flex-[1.2] flex-col 2xl:flex-1" defaultValue="hymnal_worship">
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
        <div className="flex flex-[0.8] flex-col 2xl:flex-1">
          <SermonPanel />
        </div>
      </div>
      <div className="flex h-9 items-center gap-4">
        <Button variant="outline" size="sm" disabled={!display} onClick={() => close()}>
          Turn off
        </Button>
        {display}
      </div>
    </div>
  );
}

function SlidesContent() {
  return <div>Slides</div>;
}

export { Controller };
