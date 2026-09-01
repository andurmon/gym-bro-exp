import { styled } from "@mui/material/styles";
import { Box, Card, Paper, Chip } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const PageHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
});

export const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--surface, #13324A)",
  border: "1px solid var(--secondary, #3E5A72)",
  borderRadius: 16,
  padding: theme.spacing(3),
}));

export const WorkoutsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 20,
});

export const WorkoutCardRoot = styled(Card)(({ theme }) => ({
  backgroundColor: "var(--surface, #13324A)",
  border: "1px solid var(--secondary, #3E5A72)",
  borderRadius: 16,
  padding: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  gap: 12,
  transition: "border-color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    borderColor: "var(--accent, #FF6B4A)",
    transform: "translateY(-2px)",
  },
}));

export const CategoryChip = styled(Chip)({
  backgroundColor: "rgba(255, 107, 74, 0.15)",
  color: "var(--accent, #FF6B4A)",
  border: "1px solid var(--accent, #FF6B4A)",
  fontWeight: 600,
  textTransform: "capitalize",
});

export const TypeChip = styled(Chip)({
  backgroundColor: "rgba(234, 242, 245, 0.08)",
  color: "var(--text, #EAF2F5)",
  border: "1px solid var(--secondary, #3E5A72)",
  textTransform: "capitalize",
});

export const ExercisesContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "1rem",
  overflowX: "auto",
});

export const ExerciseImg = styled("img")({
  borderRadius: 8,
  height: "100%",
});

export const ExerciseListItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1, 0),

  height: 100,
  borderRadius: 8,
}));

export const AddExerciseRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
});

export const EmptyStateCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "var(--surface, #13324A)",
  border: "1px dashed var(--secondary, #3E5A72)",
  borderRadius: 16,
  padding: theme.spacing(5),
  textAlign: "center",
}));
