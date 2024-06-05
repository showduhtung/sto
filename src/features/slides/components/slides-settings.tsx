import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { SettingsContainer } from "@/ui/shared";

function SlidesSettings() {
  return (
    <SettingsContainer>
      <Card>
        <CardHeader>
          <CardTitle>Slides Color Scheme</CardTitle>
          <CardDescription>Customize the (uploaded) slides color scheme.</CardDescription>
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

export { SlidesSettings };
