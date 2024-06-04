import { Settings } from "lucide-react";
import { Button } from "@/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { LanguageSettings } from "./settings/language-settings";
import { ProjectorSettings } from "./settings/projector-settings";
import { HymnSettings } from "./settings/hymn-settings";
import { SermonSettings } from "./settings/sermon-settings";
import { MiscellaneousSettings } from "./settings/miscellaneous-settings";
import { BibleSettings } from "./settings/bible-settings";
import { SlidesSettings } from "./settings/slides-settings";

const tabs = [
  { value: "language", label: "Language", content: <LanguageSettings /> },
  { value: "projector", label: "Projector", content: <ProjectorSettings /> },
  { value: "hymn", label: "Hymn", content: <HymnSettings /> },
  { value: "sermon", label: "Sermon", content: <SermonSettings /> },
  { value: "bible", label: "Bible", content: <BibleSettings /> },
  { value: "slides", label: "Slides", content: <SlidesSettings /> },
  { value: "misc", label: "Miscellaneous", content: <MiscellaneousSettings /> },
];

function SettingsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="text" className="flex gap-2" size="sm">
          <Settings width="18" height="18" />
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

export { SettingsModal };
