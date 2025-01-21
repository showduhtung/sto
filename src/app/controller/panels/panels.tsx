import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HymnTypeContextProvider } from "@/domains/music/hymns";

import { HymnPanel } from "./hymn-panel";
import { BiblePanel } from "./bible-panel";
import { SermonPanel } from "./sermon-panel";

const tabs = [
  {
    value: "hymnal_worship",
    label: "Hymnal Worship",
    content: (
      <HymnTypeContextProvider value={{ type: "HYMNAL_WORSHIP" }}>
        <HymnPanel />
      </HymnTypeContextProvider>
    ),
  },
  {
    value: "sermon_hymns",
    label: "Sermon Hymns",
    content: (
      <HymnTypeContextProvider value={{ type: "SERMON_HYMNS" }}>
        <HymnPanel />
      </HymnTypeContextProvider>
    ),
  },
  { value: "bible", label: "Bible", content: <BiblePanel /> },
  { value: "slides", label: "Slides", content: <SlidesContent /> },
];

function Panels() {
  return (
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
  );
}

function SlidesContent() {
  return <div>Slides</div>;
}

export { Panels };
