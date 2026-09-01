// AddWorkoutForm.jsx
import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useExercises } from "../../../../api/hooks/useExercises";
import { useTranslate } from "../../../../hooks/useTranslate";
import * as S from "./styles";
import useBreakpoints from "../../../../hooks/useBreakpoints";

const CATEGORIES = ["strength", "cardio", "mobility"];
const TRAINING_TYPES = ["upper_body", "lower_body", "full_body"];

/* ---------- subcomponents ---------- */

function Stepper({ label, value, onChange, min = 1 }) {
  return (
    <S.StepperBox>
      <Typography
        variant="caption"
        sx={{ color: "var(--color-text-muted, #9BB4C4)" }}
      >
        {label}
      </Typography>
      <IconButton
        size="small"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={`Decrease ${label}`}
        sx={{ color: "var(--color-text, #EAF2F5)", p: 0.25 }}
      >
        <RemoveIcon sx={{ fontSize: 14 }} />
      </IconButton>
      <Typography
        variant="body2"
        sx={{
          color: "var(--color-text, #EAF2F5)",
          fontWeight: 500,
          width: 16,
          textAlign: "center",
        }}
      >
        {value}
      </Typography>
      <IconButton
        size="small"
        onClick={() => onChange(value + 1)}
        aria-label={`Increase ${label}`}
        sx={{ color: "var(--color-text, #EAF2F5)", p: 0.25 }}
      >
        <AddIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </S.StepperBox>
  );
}

/* ---------- main component ---------- */

export default function WorkoutsForm({ onSave, onCancel }) {
  const { translate } = useTranslate();
  const { isMd } = useBreakpoints();

  const [workoutName, setWorkoutName] = useState("");
  const [category, setCategory] = useState("Strength");
  const [trainingType, setTrainingType] = useState("Upper body");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const { useListAllExercises } = useExercises();
  const exercisesResult = useListAllExercises();
  const exercises = Array.isArray(exercisesResult?.data)
    ? exercisesResult.data
    : [];

  const exercisesMapped = exercises.map((ex) => ({
    ...ex,
    name: translate(ex.key, ex.name),
  }));

  const filteredLibrary = exercisesMapped.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase()),
  );

  const isSelected = (id) => selected.some((s) => s.id === id);

  const toggleExercise = (exercise) => {
    setSelected((prev) =>
      isSelected(exercise.id)
        ? prev.filter((s) => s.id !== exercise.id)
        : [...prev, { ...exercise, sets: 3, reps: 10 }],
    );
  };

  const updateSelected = (id, field, value) => {
    setSelected((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const moveExercise = (index, direction) => {
    setSelected((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removeExercise = (id) => {
    setSelected((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    onSave?.({
      key: workoutName.toLowerCase().replace(/\s+/g, "_"),
      name: workoutName,
      category,
      typeOfTraining: trainingType,
      exercises: selected.map((s, i) => ({
        id: s.id,
        sets: s.sets,
        reps: s.reps,
      })),
    });
  };

  const canSave = workoutName.trim().length > 0 && selected.length > 0;

  return (
    <>
      <S.SectionBody>
        <TextField
          fullWidth
          size="small"
          placeholder={translate("name")}
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "var(--color-surface, #13324A)",
              color: "var(--color-text, #EAF2F5)",
              "& fieldset": { borderColor: "var(--color-border, #3E5A72)" },
            },
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: "var(--color-text-muted, #9BB4C4)",
            display: "block",
            mb: 0.75,
          }}
        >
          {translate("category")}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 2 }}
        >
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={translate(c)}
              size="small"
              onClick={() => setCategory(c)}
              sx={{
                backgroundColor:
                  category === c
                    ? "var(--color-accent, #FF6B4A)"
                    : "transparent",
                color:
                  category === c ? "#4A1B0C" : "var(--color-text, #EAF2F5)",
                border:
                  category === c
                    ? "none"
                    : "0.5px solid var(--color-border, #3E5A72)",
                fontWeight: category === c ? 500 : 400,
              }}
            />
          ))}
        </Stack>

        <Typography
          variant="caption"
          sx={{
            color: "var(--color-text-muted, #9BB4C4)",
            display: "block",
            mb: 0.75,
          }}
        >
          {translate("type_of_training")}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {TRAINING_TYPES.map((t) => (
            <Chip
              key={t}
              label={translate(t)}
              size="small"
              onClick={() => setTrainingType(t)}
              sx={{
                backgroundColor:
                  trainingType === t
                    ? "var(--color-accent, #FF6B4A)"
                    : "transparent",
                color:
                  trainingType === t ? "#4A1B0C" : "var(--color-text, #EAF2F5)",
                border:
                  trainingType === t
                    ? "none"
                    : "0.5px solid var(--color-border, #3E5A72)",
                fontWeight: trainingType === t ? 500 : 400,
              }}
            />
          ))}
        </Stack>
      </S.SectionBody>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        <S.PickerColumn>
          <TextField
            fullWidth
            size="small"
            placeholder="Search exercises"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 1.5,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "var(--color-surface, #13324A)",
                color: "var(--color-text, #EAF2F5)",
                "& fieldset": { borderColor: "var(--color-border, #3E5A72)" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      fontSize: 16,
                      color: "var(--color-text-muted, #9BB4C4)",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <S.ExerciseGrid>
            {filteredLibrary.map((ex) => {
              const active = isSelected(ex.id);
              return (
                <S.ExerciseCard
                  key={ex.id}
                  active={active}
                  elevation={0}
                  onClick={() => toggleExercise(ex)}
                >
                  <S.ExerciseThumb
                    sx={
                      ex.imageUrl
                        ? { backgroundImage: `url(${ex.imageUrl})` }
                        : {}
                    }
                  >
                    {!ex.imageUrl &&
                      (active ? (
                        <CheckIcon
                          sx={{
                            fontSize: 18,
                            color: "var(--color-accent, #FF6B4A)",
                          }}
                        />
                      ) : (
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--color-text-muted, #9BB4C4)" }}
                        >
                          {ex.muscleGroup}
                        </Typography>
                      ))}
                  </S.ExerciseThumb>
                  <Box sx={{ px: 1, py: 0.75 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--color-text, #EAF2F5)" }}
                    >
                      {ex.name}
                    </Typography>
                  </Box>
                </S.ExerciseCard>
              );
            })}
            {filteredLibrary.length === 0 && (
              <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 3 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--color-text-muted, #9BB4C4)" }}
                >
                  No exercises match "{search}"
                </Typography>
              </Box>
            )}
          </S.ExerciseGrid>
        </S.PickerColumn>

        <S.BuilderColumn>
          <Typography
            variant="caption"
            sx={{
              color: "var(--color-text-muted, #9BB4C4)",
              display: "block",
              mb: 1.25,
            }}
          >
            Your workout · {selected.length} exercise
            {selected.length !== 1 ? "s" : ""}
          </Typography>

          <Stack
            spacing={1}
            sx={{ maxHeight: 320, overflowY: "auto", pr: 0.5 }}
          >
            {selected.map((ex, index) => (
              <S.SelectedRow key={ex.id} elevation={0}>
                <S.ReorderStack>
                  <IconButton
                    size="small"
                    disabled={index === 0}
                    onClick={() => moveExercise(index, -1)}
                    aria-label="Move up"
                    sx={{ p: 0, color: "var(--color-text-muted, #9BB4C4)" }}
                  >
                    <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={index === selected.length - 1}
                    onClick={() => moveExercise(index, 1)}
                    aria-label="Move down"
                    sx={{ p: 0, color: "var(--color-text-muted, #9BB4C4)" }}
                  >
                    <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </S.ReorderStack>

                <S.ThumbSquare
                  sx={
                    ex.imageUrl
                      ? { backgroundImage: `url(${ex.imageUrl})` }
                      : {}
                  }
                />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ color: "var(--color-text, #EAF2F5)" }}
                  >
                    {ex.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Stepper
                      label="sets"
                      value={ex.sets}
                      onChange={(v) => updateSelected(ex.id, "sets", v)}
                    />
                    <Stepper
                      label="reps"
                      value={ex.reps}
                      onChange={(v) => updateSelected(ex.id, "reps", v)}
                    />
                  </Stack>
                </Box>

                <IconButton
                  size="small"
                  onClick={() => removeExercise(ex.id)}
                  aria-label={`Remove ${ex.name}`}
                  sx={{ color: "var(--color-text-muted, #9BB4C4)" }}
                >
                  <CloseIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </S.SelectedRow>
            ))}

            {selected.length === 0 && (
              <S.EmptyState>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--color-text-muted, #9BB4C4)" }}
                >
                  {!isMd
                    ? "Pick exercises from the left to add them here"
                    : "Pick exercises from above to add them here"}
                </Typography>
              </S.EmptyState>
            )}
          </Stack>
        </S.BuilderColumn>
      </Box>

      <S.Footer>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            color: "var(--color-text, #EAF2F5)",
            borderColor: "var(--color-border, #3E5A72)",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!canSave}
          onClick={handleSave}
          sx={{
            backgroundColor: "var(--color-accent, #FF6B4A)",
            color: "#4A1B0C",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "var(--color-accent, #FF6B4A)",
              opacity: 0.9,
            },
          }}
        >
          Save workout
        </Button>
      </S.Footer>
    </>
  );
}
