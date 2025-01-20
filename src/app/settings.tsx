import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/ui/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/components/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/components/dialog";

import { LanguageSettings } from "@/domains/language";
import { HymnSettings } from "@/domains/music/hymns";
import { BibleSettings } from "@/domains/bible";
import { ProjectorSettings } from "@/domains/projector";
import { SermonSettings } from "@/domains/sermon";
import { SlidesSettings } from "@/domains/slides";
import { MiscellaneousSettings } from "@/domains/shared/settings";

const tabs = [
  { value: "language", label: "Language", content: <LanguageSettings /> },
  { value: "projector", label: "Projector", content: <ProjectorSettings /> },
  { value: "hymn", label: "Hymn", content: <HymnSettings /> },
  { value: "sermon", label: "Sermon", content: <SermonSettings /> },
  { value: "bible", label: "Bible", content: <BibleSettings /> },
  { value: "slides", label: "Slides", content: <SlidesSettings /> },
  { value: "misc", label: "Miscellaneous", content: <MiscellaneousSettings /> },
];

function Settings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="text" className="flex gap-2" size="sm">
          <SettingsIcon width="18" height="18" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="shadow-lg sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your settings and preferences.</DialogDescription>
        </DialogHeader>
        <Tabs className="flex h-[60dvh] flex-col" defaultValue="language">
          <TabsList>
            {tabs.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(({ value, content }) => (
            <TabsContent key={value} value={value} className="grow overflow-auto">
              {content}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export { Settings };
