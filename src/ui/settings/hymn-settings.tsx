import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/select";
import { Label } from "@/components/label";
import { SettingsContainer } from "./components";
import { Switch } from "@/components/switch";
import { Slider } from "@/components/slider";

function HymnSettings() {
  return (
    <SettingsContainer>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Select your general hymnal settings.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="hymn-playback-switch">Audio Playback</Label>
            <div className="h-9">
              <Switch id="hymn-playback-switch" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hymn-verseswrap-switch">Wrap Verses</Label>
            <div className="h-9">
              <Switch id="hymn-verseswrap-switch" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hymn-timestamp-switch">Timestamp Tools (volunteers)</Label>
            <div className="h-9">
              <Switch id="hymn-timestamp-switch" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lyrics Font Size</CardTitle>
          <CardDescription>Customize the font size of the lyrics.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <Label htmlFor="lyrics-enfontsize-switch">EN Font Size: 4.6</Label>
              <div className="flex items-center gap-3">
                <Label>Auto-fit Text</Label>
                <Switch id="lyrics-enfontsize-switch" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Slider defaultValue={[50]} max={15} step={1} aria-label="Theme" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lyrics-zhfontsize-switch">ZH Font Size: 4.6</Label>
              <div className="flex items-center gap-3">
                <Label>Auto-fit Text</Label>
                <Switch id="lyrics-zhfontsize-switch" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Slider defaultValue={[50]} max={15} step={1} aria-label="Theme" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lyrics Color Scheme</CardTitle>
          <CardDescription>Customize the lyrics slide color scheme.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="language-primary-select">Resolution</Label>
            <Select>
              <SelectTrigger className="w-80" id="projector-resolution-select">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="800x640">800 x 640</SelectItem>
                <SelectItem value="1024x768">1024 x 768</SelectItem>
                <SelectItem value="1280x720">1280 x 720</SelectItem>
                <SelectItem value="1600x900">1600 x 900</SelectItem>
                <SelectItem value="1920x1080">1920 x 1080</SelectItem>
                <SelectItem value="2560x1440">2560 x 1440</SelectItem>
                <SelectItem value="3840x2160">3840 x 2160</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hymnal Worship Color Scheme</CardTitle>
          <CardDescription>Customize the hymnal worship slide color scheme.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="language-primary-select">Resolution</Label>
            <Select>
              <SelectTrigger className="w-80" id="projector-resolution-select">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="800x640">800 x 640</SelectItem>
                <SelectItem value="1024x768">1024 x 768</SelectItem>
                <SelectItem value="1280x720">1280 x 720</SelectItem>
                <SelectItem value="1600x900">1600 x 900</SelectItem>
                <SelectItem value="1920x1080">1920 x 1080</SelectItem>
                <SelectItem value="2560x1440">2560 x 1440</SelectItem>
                <SelectItem value="3840x2160">3840 x 2160</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </SettingsContainer>
  );
}

export { HymnSettings };
