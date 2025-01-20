import { SettingsCardContent, SettingsSelect } from "@/domains/shared/settings";
import { SettingsContainer } from "@/ui/shared";

function SlidesSettings() {
  return (
    <SettingsContainer>
      <SettingsCardContent
        title="Slides Color Scheme"
        description="Customize the (uploaded) slides color scheme."
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

export { SlidesSettings };
