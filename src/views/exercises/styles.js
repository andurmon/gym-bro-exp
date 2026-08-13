import { Box, Card, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const ExerciseCard = styled(Card)(() => ({
  backgroundColor: "var(--bg)",
  color: "var(--text)",
  border: `1px solid var(--secondary)`,
  borderRadius: 14,
  boxShadow: "none",
  height: "100%",
}));

export const ExerciseCardHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
}));
