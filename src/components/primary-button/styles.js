import { Button, Fab as MuiFab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme?.palette?.primary?.main ?? "var(--primary)",
  color: "var(--text)",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 10,
  padding: "10px 18px",

  "&:hover": {
    backgroundColor: "#E85C3F",
  },
}));

export const Fab = styled(MuiFab)(({ theme }) => ({
  position: "fixed",
  right: 16,
  bottom: 16,
  backgroundColor: "var(--primary)",
  color: "var(--text)",
  "&:hover": { backgroundColor: "#E85C3F" },
  zIndex: 1300,
}));
