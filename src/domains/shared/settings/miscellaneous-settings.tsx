import { Download, Upload } from "lucide-react";
import { SettingsCardContent, SettingsButton, SettingsContainer } from "@/domains/shared/settings";

function MiscellaneousSettings() {
  return (
    <SettingsContainer>
      <SettingsCardContent
        title="Settings Management"
        description="Import/Export your settings and preferences."
      >
        <SettingsButton label="Export Settings">
          <Upload className="h-4 w-4" /> Export
        </SettingsButton>
        <SettingsButton label="Import Settings">
          <Download className="h-4 w-4" /> Import
        </SettingsButton>
        <SettingsButton label="Reset to Default Settings" color="danger">
          <Upload className="h-4 w-4" /> Reset
        </SettingsButton>
      </SettingsCardContent>
    </SettingsContainer>
  );
}

export { MiscellaneousSettings };
