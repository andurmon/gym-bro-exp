import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const useBreakpoints = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  return { isSm, isMd, isLg };
};

export default useBreakpoints;
