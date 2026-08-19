import { Box, Card, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SelectEquipment = styled(Select)(() => ({
  backgroundColor: "var(--bg)",
  color: "var(--text)",
  borderRadius: 2,
  ".MuiSvgIcon-root": { color: "var(--text)" },
  fieldset: { borderColor: "var(--secondary)" },
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
}));

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "var(--bg)",
  color: "var(--text)",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const SectionCard = styled(Paper)(() => ({
  backgroundColor: "var(--surface)",
  border: `1px solid var(--secondary)`,
  borderRadius: 16,
  padding: 20,
}));
