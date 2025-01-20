import {
  SettingsCardContent,
  SettingsSwitch,
  SettingsSelect,
  SettingsContainer,
} from "@/domains/shared/settings";
import { type LanguageState, useLanguageStore, languages } from "@/domains/language";

function LanguageSettings() {
  const { bilingual, primaryLanguageId, secondaryLanguageId, panelLanguageId, update } =
    useLanguageStore();

  function handleChange(key: keyof LanguageState) {
    function swapLanguages() {
      update("primaryLanguageId", secondaryLanguageId);
      update("secondaryLanguageId", primaryLanguageId);
    }

    return (value: LanguageState[keyof LanguageState]) => {
      const shouldSwap =
        (key === "primaryLanguageId" && value === secondaryLanguageId) ||
        (key === "secondaryLanguageId" && value === primaryLanguageId);

      if (shouldSwap) swapLanguages();
      else update(key, value);
    };
  }

  return (
    <SettingsContainer>
      <SettingsCardContent title="Languages" description="Customize your language preferences.">
        <SettingsSwitch
          label="Bilingual Mode"
          id="language-bilingual"
          checked={bilingual}
          onCheckedChange={handleChange("bilingual")}
        />

        <SettingsSelect
          value={primaryLanguageId}
          label="Primary"
          options={languages}
          placeholder="Select primary language"
          onValueChange={handleChange("primaryLanguageId")}
        />

        {bilingual && (
          <SettingsSelect
            value={secondaryLanguageId}
            label="Secondary"
            options={languages}
            placeholder="Select secondary language"
            onValueChange={handleChange("secondaryLanguageId")}
          />
        )}

        <SettingsSelect
          value={panelLanguageId}
          label="Control Panel"
          options={languages.map((lang) => ({ ...lang, disabled: false }))}
          placeholder="Select control panel language"
          onValueChange={handleChange("panelLanguageId")}
        />
      </SettingsCardContent>
    </SettingsContainer>
  );
}

export { LanguageSettings };
