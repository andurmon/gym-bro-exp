import styled from "@emotion/styled";
import { Box, FormControl, MenuItem, Typography } from "@mui/material";

export const SettingsContainer = styled(Box)`
  padding: 24px;
`;

export const SettingsTitle = styled(Typography)`
  margin-bottom: 24px !important;
`;

export const LanguageSetting = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 480px;
`;

export const LanguageLabel = styled(Typography)`
  font-weight: 500 !important;
`;

export const LanguageSelect = styled(FormControl)`
  min-width: 180px;
`;

export const LanguageOption = styled(MenuItem)``;
