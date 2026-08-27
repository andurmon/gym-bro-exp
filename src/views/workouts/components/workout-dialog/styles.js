import {
  Dialog as MuiDialog,
  SwipeableDrawer as MuiSwipeableDrawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const swipeableDrawer = styled(MuiSwipeableDrawer)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: "var(--bg)",
    borderRadius: "20px 20px 0 0",
  },
}));

const dialog = styled(MuiDialog)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: "var(--bg)",
    borderRadius: "20px",
  },
}));

export { dialog as Dialog, swipeableDrawer as SwipeableDrawer };
