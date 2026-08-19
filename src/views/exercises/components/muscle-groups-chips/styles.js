import {
  Box as MuiBox,
  Chip as MuiChip,
  Stack as MuiStack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const ChipsContainer = styled(MuiBox)(() => ({
  overflowX: "auto",
  paddingBottom: "10px",
}));

export const Chip = styled(MuiChip)(() => ({
  color: "var(--text)",
  borderColor: "var(--secondary)",
}));

export const Stack = styled(MuiStack)(() => ({
  gap: "5px",
}));
