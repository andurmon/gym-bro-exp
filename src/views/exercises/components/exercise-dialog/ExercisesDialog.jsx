import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Drawer,
  Box,
  Stack,
  IconButton,
  CircularProgress,
  Typography,
  SwipeableDrawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useEquipment } from "../../../../api/hooks/useEquipment";
import { useExercises } from "../../../../api/hooks/useExercises";
import { useMuscleGroups } from "../../../../api/hooks/useMuscleGroups";
import ExercisesFormView from "../exercises-form-view/ExercisesFormView";

export default function ExercisesDialog({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { useCreateExercise } = useExercises();
  const createMutation = useCreateExercise();

  const { useListAllMuscleGroups } = useMuscleGroups();
  const muscleGroupsResult = useListAllMuscleGroups();

  const { useListAllEquipment } = useEquipment();
  const equipmentResult = useListAllEquipment();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [muscleGroupId, setMuscleGroupId] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [description, setDescription] = useState("");

  const submitting = createMutation.isLoading;

  const resetForm = () => {
    setName("");
    setCategory("");
    setMuscleGroupId("");
    setEquipmentId("");
    setDescription("");
  };

  const handleCreate = async () => {
    try {
      // Build payload according to backend expectations. Adjust if backend requires different fields.
      const payload = {
        name: name.trim(),
        category: category.trim() || undefined,
        description: description.trim() || undefined,
        muscleGroupId: muscleGroupId || undefined,
        equipmentId: equipmentId || undefined,
      };

      await createMutation.mutateAsync(payload);

      resetForm();
      onClose();
    } catch (err) {
      // For now, let mutation handle error states. Could show a toast here.
      console.error("Failed to create exercise", err);
    }
  };

  const content = (
    <ExercisesFormView
      setName={setName}
      setCategory={setCategory}
      name={name}
      category={category}
      muscleGroupId={muscleGroupId}
      setMuscleGroupId={setMuscleGroupId}
      muscleGroupsResult={muscleGroupsResult}
      equipmentId={equipmentId}
      setEquipmentId={setEquipmentId}
      equipmentResult={equipmentResult}
      description={description}
      setDescription={setDescription}
      onClose={onClose}
      submitting={submitting}
      handleCreate={handleCreate}
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
            height: "100%",
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

          <Box sx={{ pt: 4, height: "100%", overflow: "auto" }}>{content}</Box>
        </Box>
      </SwipeableDrawer>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Exercise</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
    </Dialog>
  );
}
