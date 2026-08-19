import { InputLabel, Select } from "@mui/material";
import { useTranslate } from "../../hooks/useTranslate";
import {
  LanguageLabel,
  LanguageOption,
  LanguageSelect,
  LanguageSetting,
  SettingsContainer,
  SettingsTitle,
} from "./styles";

function Settings() {
  const { language, toggleLanguage, translate } = useTranslate();
  const languageText = translate("settings_view.language", "Language");

  return (
    <SettingsContainer>
      <LanguageSetting>
        <LanguageLabel>{languageText}</LanguageLabel>

        <LanguageSelect size="small">
          <InputLabel id="language-label">{languageText}</InputLabel>

          <Select
            labelId="language-label"
            value={language}
            label={languageText}
            onChange={(event) => toggleLanguage(event.target.value)}
          >
            <LanguageOption value="en">{translate("english")}</LanguageOption>
            <LanguageOption value="es">{translate("spanish")}</LanguageOption>
          </Select>
        </LanguageSelect>
      </LanguageSetting>
    </SettingsContainer>
  );
}

export default Settings;
