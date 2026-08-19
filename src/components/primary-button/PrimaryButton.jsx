import { useTheme } from "@emotion/react";
import { Fab, PrimaryButton as StyledPrimaryButton } from "./styles.js";
import { useMediaQuery } from "@mui/material";

const PrimaryButton = ({ startIcon, children, ...rest }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  if (mdUp) {
    return (
      <StyledPrimaryButton startIcon={startIcon} {...rest}>
        {children}
      </StyledPrimaryButton>
    );
  }

  return (
    <>
      <Fab aria-label="create" {...rest}>
        {startIcon}
      </Fab>
    </>
  );
};

export default PrimaryButton;
