import { Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ExerciseImage = styled("img")(() => ({
  borderRadius: 8,
  width: 200,
  cursor: "pointer",
}));

export const ExerciseImageContainer = styled(Box)(() => ({
  width: 200,
  height: 130,
  borderRadius: 8,
  backgroundColor: "var(--text)",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
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
