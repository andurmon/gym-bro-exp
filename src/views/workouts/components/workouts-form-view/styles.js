import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const SectionBody = styled(Box)({
  padding: "16px 20px",
  borderBottom: "0.5px solid var(--color-border, #3E5A72)",
});

export const PickerColumn = styled(Box)(({ theme }) => ({
  padding: "16px 20px",
  borderBottom: "0.5px solid var(--color-border, #3E5A72)",
  [theme.breakpoints.up("md")]: {
    borderBottom: "none",
    borderRight: "0.5px solid var(--color-border, #3E5A72)",
  },
}));

export const BuilderColumn = styled(Box)({
  padding: "16px 20px",
});

export const ExerciseGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  maxHeight: 320,
  overflowY: "auto",
  paddingRight: 4,
});

export const ExerciseCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: 8,
  backgroundColor: "var(--color-surface, #13324A)",
  border: active
    ? "1.5px solid var(--color-accent, #FF6B4A)"
    : "0.5px solid var(--color-border, #3E5A72)",
}));

export const ExerciseThumb = styled(Box)({
  height: 70,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--color-border, #3E5A72)",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const SelectedRow = styled(Paper)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: 8,
  borderRadius: 8,
  backgroundColor: "var(--color-surface, #13324A)",
  border: "0.5px solid var(--color-border, #3E5A72)",
});

export const ReorderStack = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const ThumbSquare = styled(Box)({
  width: 32,
  height: 32,
  borderRadius: 6,
  flexShrink: 0,
  backgroundColor: "var(--color-border, #3E5A72)",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const StepperBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
  borderRadius: 6,
  padding: "2px 4px",
  backgroundColor: "var(--color-bg)",
});

export const EmptyState = styled(Box)({
  textAlign: "center",
  padding: "20px 12px",
  borderRadius: 8,
  border: "1px dashed var(--color-border, #3E5A72)",
});

export const Footer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  padding: "14px 20px",
  borderTop: "0.5px solid var(--color-border, #3E5A72)",
});
