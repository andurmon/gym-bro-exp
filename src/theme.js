import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0B1E2E",
      paper: "#13324A",
    },
    primary: {
      main: "#FF6B4A",
    },
    secondary: {
      main: "#3E5A72",
    },
    text: {
      primary: "#EAF2F5",
      secondary: "rgba(234, 242, 245, 0.72)",
    },
    divider: "#3E5A72",
  },
  typography: {
    fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"].join(
      ",",
    ),
    h1: {
      fontFamily: [
        "Montserrat",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
      fontWeight: 800,
    },
    h2: {
      fontFamily: [
        "Montserrat",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
      fontWeight: 700,
    },
    h3: {
      fontFamily: [
        "Montserrat",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
      fontWeight: 700,
    },
    h4: {
      fontFamily: [
        "Montserrat",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
      fontWeight: 700,
    },
    h5: {
      fontFamily: [
        "Montserrat",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
      fontWeight: 700,
    },
    h6: {
      fontFamily: [
        "Montserrat",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontFamily: [
        "Inter",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ].join(","),
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
