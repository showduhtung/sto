import { SettingsContainer, SettingsSelect, SettingsSwitch } from "@/ui/shared";
import { languages } from "../utilities";
import { SettingsCardContent } from "@/ui/shared";

function LanguageSettings() {
  // const { bilingual, primaryLanguageId, secondaryLanguageId } = useLanguages();
  return (
    <SettingsContainer>
      <SettingsCardContent title="Languages" description="Customize your language preferences.">
        <SettingsSwitch label="Bilingual Mode" id="language-bilingual" />

        <SettingsSelect
          label="Primary"
          options={languages.map(({ id, text }) => ({ value: id, label: text }))}
          placeholder="Select primary language"
        />
        <SettingsSelect
          label="Secondary"
          options={languages.map(({ id, text }) => ({ value: id, label: text }))}
          placeholder="Select secondary language"
        />

        <SettingsSelect
          label="Control Panel"
          options={languages.map(({ id, text }) => ({ value: id, label: text }))}
          placeholder="Select control panel language"
        />
      </SettingsCardContent>
    </SettingsContainer>
  );
}

export { LanguageSettings };
