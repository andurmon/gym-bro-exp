import { Box, Card, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

// -----------------------------------------------------------------------------
// Styled components (using CSS variables from index.css)
// -----------------------------------------------------------------------------
export const DaysConainer = styled(Box)({
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   gap: "1rem",
  //   overflowX: "auto",
});

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "var(--bg)",
  color: "var(--text)",
  padding: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
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

export const WeekContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(100px, 1fr))",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    overflowX: "auto",
    gridTemplateColumns: "repeat(7, 120px)",
    paddingBottom: theme.spacing(1),
  },
}));

export const CardStyled = styled(Card)(() => ({
  backgroundColor: "var(--surface)",
  color: "var(--text)",
  border: "1px solid var(--secondary)",
  borderRadius: 14,
  boxShadow: "none",
}));

export const ExerciseCard = styled(Card)(() => ({
  backgroundColor: "var(--bg)",
  color: "var(--text)",
  border: "1px solid var(--secondary)",
  borderRadius: 12,
  boxShadow: "none",
  transition: "border-color 0.2s ease",

  "&:hover": {
    borderColor: "var(--primary)",
  },
}));

export const ExerciseImage = styled(Box)(() => ({
  width: 120,
  height: 90,
  borderRadius: 8,
  backgroundColor: "var(--text)",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}));

export const SectionHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
}));
