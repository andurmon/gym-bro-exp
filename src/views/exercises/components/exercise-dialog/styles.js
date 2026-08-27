import {
  SwipeableDrawer as MuiSwipeableDrawer,
  Dialog as MuiDialog,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const SwipeableDrawer = styled(MuiSwipeableDrawer)(() => ({
  "& .MuiPaper-root": {
    height: "70%",
    backgroundColor: "var(--bg)",
    borderRadius: "20px 20px 0 0",
  },
}));

export const Dialog = styled(MuiDialog)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: "var(--bg)",
    borderRadius: "20px  ",
  },
}));
