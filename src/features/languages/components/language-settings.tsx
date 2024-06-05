import { Switch } from "@/components/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/select";
import { Label } from "@/components/label";
import { SettingsContainer } from "@/ui/shared";

const languages = [
  { id: "en", text: "English", display: "EN" },
  { id: "zh", text: "简体中文", display: "ZH" },
  { id: "zh-simple", text: "繁體中文", display: "ZH" },
  { id: "id", text: "Bahasa Indonesia", display: "ID" },
];

function LanguageSettings() {
  return (
    <SettingsContainer>
      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Customize your language preferences.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="language-primary-select">Bilingual Mode</Label>
            <div className="h-9">
              <Switch id="language-bilingual-switch" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="language-primary-select">Primary</Label>
            <Select>
              <SelectTrigger className="w-80" id="language-primary-select">
                <SelectValue placeholder="Select primary language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="language-secondary-select">Secondary</Label>
            <Select>
              <SelectTrigger className="w-80" id="language-secondary-select">
                <SelectValue placeholder="Select secondary language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="language-control-select">Control Panel</Label>
            <Select>
              <SelectTrigger className="w-80" id="language-control-select">
                <SelectValue placeholder="Select control panel language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </SettingsContainer>
  );
}

export { LanguageSettings };
