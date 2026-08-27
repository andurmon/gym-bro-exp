import {
  DialogTitle,
  DialogContent,
  useMediaQuery,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useEquipment } from "../../../../api/hooks/useEquipment";
import { useMuscleGroups } from "../../../../api/hooks/useMuscleGroups";
import ExercisesFormView from "../exercises-form-view/ExercisesFormView";
import useFormConfig from "./useFormConfig";
import { useTranslate } from "../../../../hooks/useTranslate";
import { ADD_MODE } from "../../constants";
import { Dialog, SwipeableDrawer } from "./styles";

export default function ExercisesDialog({ mode, open, onClose }) {
  const { translate } = useTranslate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { useListAllMuscleGroups } = useMuscleGroups();
  const muscleGroupsResult = useListAllMuscleGroups();

  const { useListAllEquipment } = useEquipment();
  const equipmentResult = useListAllEquipment();

  const formConfig = useFormConfig({ mode, onClose });

  const formView = (
    <ExercisesFormView
      formConfig={formConfig}
      muscleGroupsResult={muscleGroupsResult}
      equipmentResult={equipmentResult}
      handleClose={onClose}
    />
  );

  if (isMobile) {
    // Animated drawer that covers the mobile screen
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
        PaperProps={{
          sx: {
            height: "10%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {translate(mode === ADD_MODE ? "add_new_exercise" : "edit_exercise")}{" "}
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
