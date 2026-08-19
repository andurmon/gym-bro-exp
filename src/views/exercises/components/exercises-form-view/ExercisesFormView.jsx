import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ExercisesFormView = ({
  setName,
  setCategory,
  name,
  category,
  muscleGroupId,
  setMuscleGroupId,
  muscleGroupsResult,
  equipmentId,
  setEquipmentId,
  equipmentResult,
  description,
  setDescription,
  onClose,
  submitting,
  onChange,
  onClick,
  handleCreate,
}) => {
  return (
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
};

export default ExercisesFormView;
