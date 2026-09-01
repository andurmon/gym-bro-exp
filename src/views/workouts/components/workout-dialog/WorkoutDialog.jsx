import {
  Box,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useTranslate } from "../../../../hooks/useTranslate";
import { Dialog, SwipeableDrawer } from "./styles";
import WorkoutsFormView from "../workouts-form-view/WorkoutsFormView";
import useFormConfig from "./useFormConfig";

function WorkoutDialog({ mode, open, onClose, onCreate }) {
  const { translate } = useTranslate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const formConfig = useFormConfig({ mode, onClose });

  const formView = (
    <WorkoutsFormView formConfig={formConfig} handleClose={onClose} />
  );

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={() => {}}
        swipeAreaWidth={24}
        hysteresis={0.2}
        minFlingVelocity={400}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ pt: 4, height: "100%", overflow: "auto" }}>{formView}</Box>
        </Box>
      </SwipeableDrawer>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      TransitionComponent={Fade} //This is suposed to fix the Draggable behavior
    >
      <DialogTitle>
        {translate("workouts_view.create_workout")}
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{formView}</DialogContent>
    </Dialog>
  );
}

export default WorkoutDialog;
