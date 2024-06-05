import { Download, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { Button } from "@/components/button";
import { SettingsContainer } from "../shared";

function MiscellaneousSettings() {
  return (
    <SettingsContainer>
      <Card>
        <CardHeader>
          <CardTitle>Settings Management</CardTitle>
          <CardDescription>Easily manage your settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="settings-export-button">Export Settings</Label>
            <Button
              variant="outline"
              size="xs"
              className="flex w-24 justify-start gap-2"
              id="restore-export-button"
            >
              <Upload className="h-4 w-4" /> Export
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="settings-import-button">Import Settings</Label>
            <Button
              variant="outline"
              size="xs"
              className="flex w-24 justify-start gap-2"
              id="settings-import-button"
            >
              <Download className="h-4 w-4" /> Import
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="settings-restore-button">Reset to Default Settings</Label>
            <Button
              variant="outline"
              color="danger"
              size="xs"
              className="flex w-24 justify-start gap-2"
              id="settings-restore-button"
            >
              <Upload className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </SettingsContainer>
  );
}

export { MiscellaneousSettings };
