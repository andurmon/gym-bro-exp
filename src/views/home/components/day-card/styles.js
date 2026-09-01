import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const CardStyled = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => {
  //   if (theme.breakpoints.up("sm")) {
  //     console.log("CY theme: ", theme);
  //     return;
  //   }
  return {
    backgroundColor: selected ? "var(--surface)" : "var(--bg)",
    color: "var(--text)",
    border: selected
      ? "1px solid var(--primary)"
      : "1px solid var(--secondary)",
    borderRadius: 12,
    padding: "14px 12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minHeight: 92,

    "&:hover": {
      borderColor: "var(--primary)",
      transform: "translateY(-2px)",
    },
  };
});
