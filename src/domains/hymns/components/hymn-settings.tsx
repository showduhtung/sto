import { useState } from "react";
import {
  SettingsCardContent,
  SettingsSwitch,
  SettingsFontSlider,
  SettingsSelect,
} from "@/domains/shared/settings";
import { useHymnSettings } from "../store";
import { SettingsContainer } from "@/ui/shared";

function HymnSettings() {
  const [[first, second], setState] = useState([[92], [22]]);
  const { audioPlayback, timestampTools, shouldWrapVerses, update } = useHymnSettings();

  function handleChange(idx: number) {
    return (value: [number]) => {
      if (idx === 0) setState([value, second]);
      else setState([first, value]);
    };
  }

  return (
    <SettingsContainer>
      <SettingsCardContent title="General" description="Select your general hymnal settings.">
        <SettingsSwitch
          label="Wrap Verses"
          checked={shouldWrapVerses}
          onCheckedChange={(checked) => update("shouldWrapVerses", checked)}
        />
        <SettingsSwitch
          label="Audio Playback"
          checked={audioPlayback}
          onCheckedChange={(checked) => update("audioPlayback", checked)}
        />
        <SettingsSwitch
          label="Timestamp Tools (volunteers)"
          checked={audioPlayback && timestampTools}
          disabled={!audioPlayback}
          onCheckedChange={(checked) => update("timestampTools", checked)}
        />
      </SettingsCardContent>

      <SettingsCardContent
        title="Lyrics Font Size"
        description="Customize the font size of the lyrics."
        className="gap-16"
      >
        <SettingsFontSlider
          label="English Font Size"
          value={first}
          onValueChange={handleChange(0)}
        />
        <SettingsFontSlider
          label="Chinese Font Size"
          value={second}
          onValueChange={handleChange(1)}
        />
      </SettingsCardContent>

      <SettingsCardContent
        title="Lyrics Color Scheme"
        description="Customize the lyrics slide color scheme."
      >
        <SettingsSelect
          label="Resolution"
          placeholder="Select resolution"
          options={[
            { value: "800x640", label: "800 x 640" },
            { value: "1024x768", label: "1024 x 768" },
            { value: "1280x720", label: "1280 x 720" },
            { value: "1600x900", label: "1600 x 900" },
            { value: "1920x1080", label: "1920 x 1080" },
            { value: "2560x1440", label: "2560 x 1440" },
            { value: "3840x2160", label: "3840 x 2160" },
          ]}
        />
      </SettingsCardContent>

      <SettingsCardContent
        title="Hymnal Worship Color Scheme"
        description="Customize the hymnal worship slide color scheme."
      >
        <SettingsSelect
          label="Resolution"
          placeholder="Select resolution"
          options={[
            { value: "800x640", label: "800 x 640" },
            { value: "1024x768", label: "1024 x 768" },
            { value: "1280x720", label: "1280 x 720" },
            { value: "1600x900", label: "1600 x 900" },
            { value: "1920x1080", label: "1920 x 1080" },
            { value: "2560x1440", label: "2560 x 1440" },
            { value: "3840x2160", label: "3840 x 2160" },
          ]}
        />
      </SettingsCardContent>
    </SettingsContainer>
  );
}

export { HymnSettings };
