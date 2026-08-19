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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useExercises } from "../../../api/hooks/useExercises";
import { useMuscleGroups } from "../../../api/hooks/useMuscleGroups";
import { useEquipment } from "../../../api/hooks/useEquipment";

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
    <Box sx={{ p: 2, height: "100%", boxSizing: "border-box" }}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Box>
          <Typography variant="h6">Add New Exercise</Typography>
        </Box>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
          <Select
            labelId="muscle-group-label"
            value={muscleGroupId}
            label="Muscle Group"
            onChange={(e) => setMuscleGroupId(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {(muscleGroupsResult?.data || []).map((mg) => (
              <MenuItem key={mg.id} value={mg.id}>
                {mg.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="equipment-label">Equipment</InputLabel>
          <Select
            labelId="equipment-label"
            value={equipmentId}
            label="Equipment"
            onChange={(e) => setEquipmentId(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {(equipmentResult?.data || []).map((eq) => (
              <MenuItem key={eq.id} value={eq.id}>
                {eq.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button onClick={onClose} disabled={submitting}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={submitting || !name.trim()}
          >
            {submitting ? <CircularProgress size={20} /> : "Create"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );

  if (isMobile) {
    // Animated drawer that covers the mobile screen
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { height: "100%", borderTopLeftRadius: 0, borderTopRightRadius: 0 } }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ pt: 4, height: "100%", overflow: "auto" }}>{content}</Box>
        </Box>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Exercise</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
    </Dialog>
  );
}
