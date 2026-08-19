import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SectionCard = styled(Paper)(() => ({
  backgroundColor: "var(--surface)",
  border: `1px solid var(--secondary)`,
  borderRadius: 16,
  padding: 20,
}));
