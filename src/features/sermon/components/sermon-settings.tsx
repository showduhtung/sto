import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Switch } from "@/components/switch";
import { Slider } from "@/components/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/select";
import { SettingsContainer } from "@/ui/shared";

function SermonSettings() {
  return (
    <SettingsContainer>
      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
          <CardDescription>Customize your sermon layout settings.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="sermon-orientation-radio">Orientation</Label>
          <RadioGroup defaultValue="option-one" className="flex gap-8">
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="option-one">Horizontal</Label>
              <RadioGroupItem value="option-one" id="option-one" />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="option-two">Vertical</Label>
              <RadioGroupItem value="option-two" id="option-two" />
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Font Sizes</CardTitle>
          <CardDescription>Customize your sermon styling settings.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lyrics-enfontsize-switch">English Title Font Size</Label>
              <div className="flex items-center gap-3">
                <Label>Auto-fit Text</Label>
                <Switch id="lyrics-enfontsize-switch" />
              </div>
            </div>
            <div className="flex items-center gap-4 px-1">
              <p className="whitespace-nowrap text-sm">
                Scale: <b>4.6</b>
              </p>
              <Slider defaultValue={[50]} max={100} step={1} aria-label="Theme" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lyrics-enfontsize-switch">English Subtitle Font Size: 4.6</Label>
              <div className="flex items-center gap-3">
                <Label>Auto-fit Text</Label>
                <Switch id="lyrics-enfontsize-switch" />
              </div>
            </div>
            <div className="flex items-center gap-4 px-1">
              <p className="whitespace-nowrap text-sm">
                Scale: <b>4.6</b>
              </p>
              <Slider defaultValue={[50]} max={100} step={1} aria-label="Theme" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lyrics-enfontsize-switch">Chinese Title Font Size: 4.6</Label>
              <div className="flex items-center gap-3">
                <Label>Auto-fit Text</Label>
                <Switch id="lyrics-enfontsize-switch" />
              </div>
            </div>
            <div className="flex items-center gap-4 px-1">
              <p className="whitespace-nowrap text-sm">
                Scale: <b>4.6</b>
              </p>
              <Slider defaultValue={[50]} max={100} step={1} aria-label="Theme" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lyrics-enfontsize-switch">Chinese Subtitle Font Size: 4.6</Label>
              <div className="flex items-center gap-3">
                <Label>Auto-fit Text</Label>
                <Switch id="lyrics-enfontsize-switch" />
              </div>
            </div>
            <div className="flex items-center gap-4 px-1">
              <p className="whitespace-nowrap text-sm">
                Scale: <b>4.6</b>
              </p>
              <Slider defaultValue={[50]} max={100} step={1} aria-label="Theme" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sermon Color Scheme</CardTitle>
          <CardDescription>Customize the sermon slide color scheme.</CardDescription>
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

export { SermonSettings };
