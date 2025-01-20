import {
  SettingsCardContent,
  SettingsRadioGroups,
  SettingsFontSlider,
  SettingsSelect,
} from "@/domains/shared/settings";
import { SettingsContainer } from "@/ui/shared";

function SermonSettings() {
  return (
    <SettingsContainer>
      <SettingsCardContent title="Sermon Settings" description="Customize your sermon settings.">
        <SettingsRadioGroups
          defaultValue="horizontal"
          label="Orientation"
          options={[
            { value: "horizontal", label: "Horizontal" },
            { value: "vertical", label: "Vertical" },
          ]}
        />
      </SettingsCardContent>

      <SettingsCardContent title="Layout" description="Customize your sermon layout settings.">
        <SettingsRadioGroups
          defaultValue="horizontal"
          label="Orientation"
          options={[
            { value: "horizontal", label: "Horizontal" },
            { value: "vertical", label: "Vertical" },
          ]}
        />
      </SettingsCardContent>

      <SettingsCardContent
        title="Font Sizes"
        description="Customize your sermon styling settings."
        className="gap-8"
      >
        <SettingsFontSlider label="English Title Font Size" max={100} step={1} value={[92]} />
        <SettingsFontSlider label="English Subtitle Font Size" max={100} step={1} value={[12]} />
        <SettingsFontSlider label="Chinese Title Font Size" max={100} step={1} value={[16]} />
        <SettingsFontSlider label="Chinese Subtitle Font Size" max={100} step={1} value={[26]} />
      </SettingsCardContent>

      <SettingsCardContent
        title="Sermon Color Scheme"
        description="Customize the sermon slide color scheme."
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

export { SermonSettings };
