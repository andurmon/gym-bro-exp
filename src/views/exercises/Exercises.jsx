import { useMemo, useState } from "react";
import {
  Box,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
  Fab,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon, FitnessCenter, Add } from "@mui/icons-material";
import {
  ExerciseCard,
  ExerciseCardHeader,
  ExerciseImage,
  ExerciseImageContainer,
  PageContainer,
  SectionCard,
} from "./styles";
import { useExercises } from "../../api/hooks/useExercises";
import { useMuscleGroups } from "../../api/hooks/useMuscleGroups";
import { filterExercises } from "./utils/filter-exercises";
import { mapMuscleGroups } from "./utils/map-muscle-groups";
import { useEquipment } from "../../api/hooks/useEquipment";
import { mapDropdownList } from "../../commons/map-dropdown-list";
import { ALL_OPTION } from "../../commons/constants";

import { useTranslation } from "react-i18next";
import { useTranslate } from "../../hooks/useTranslate";
import { useTheme } from "@mui/material/styles";
import ExercisesDialog from "./exercises-dialog/ExercisesDialog";

function Exercises() {
  const { translate, toggleLanguage } = useTranslate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMuscleGroup, setActiveMuscleGroup] = useState(ALL_OPTION);
  const [activeEquipment, setActiveEquipment] = useState(ALL_OPTION);

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const { useListAllMuscleGroups } = useMuscleGroups();
  const muscleGroupsResult = useListAllMuscleGroups();
  console.log("muscleGroupsResult: ", muscleGroupsResult);

  const muscleGroups = useMemo(
    () => [ALL_OPTION, ...mapDropdownList(muscleGroupsResult?.data)],
    [muscleGroupsResult?.data],
  );

  const { useListAllEquipment } = useEquipment();
  const equipmentResult = useListAllEquipment();

  const equipmentOptions = useMemo(
    () => [ALL_OPTION, ...mapDropdownList(equipmentResult?.data)],
    [equipmentResult?.data],
  );

  const { useListAllExercises } = useExercises();
  const queryResult = useListAllExercises();

  const exerciseData = queryResult?.data;

  const filteredExercises = useMemo(
    () =>
      filterExercises(
        exerciseData,
        searchQuery,
        activeMuscleGroup,
        activeEquipment,
      ),
    [exerciseData, searchQuery, activeMuscleGroup, activeEquipment],
  );

  const groupedExercises = useMemo(() => {
    return filteredExercises.reduce((groups, exercise) => {
      const group = exercise?.muscleGroups?.name;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(exercise);
      return groups;
    }, {});
  }, [filteredExercises]);

  return (
    <PageContainer>
      <Stack spacing={3}>
        <Box>
          <Typography variant="body1" color="text.secondary">
            {translate("exercises_view.description")}
          </Typography>
        </Box>

        <SectionCard>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <TextField
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                fullWidth
                placeholder={translate("exercises_view.search_field_label")}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "var(--text)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "var(--bg)",
                  borderRadius: 2,
                  input: { color: "var(--text)" },
                  fieldset: { borderColor: "var(--secondary)" },
                }}
              />

              <FormControl
                sx={{ minWidth: 180, width: { xs: "100%", sm: "auto" } }}
              >
                <InputLabel id="equipment-filter-label">Equipment</InputLabel>
                <Select
                  labelId="equipment-filter-label"
                  value={activeEquipment}
                  label={translate("equipment")}
                  onChange={(event) => setActiveEquipment(event.target.value)}
                  sx={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text)",
                    borderRadius: 2,
                    ".MuiSvgIcon-root": { color: "var(--text)" },
                    fieldset: { borderColor: "var(--secondary)" },
                  }}
                >
                  {equipmentOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {translate(option)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box>
                {mdUp ? (
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenCreateDialog(true)}
                    sx={{ textTransform: "none" }}
                  >
                    Add Exercise
                  </Button>
                ) : null}
              </Box>
            </Stack>

            <Divider sx={{ borderColor: "var(--secondary)" }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {translate("exercises_view.filter_muscle_group", "M")}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {muscleGroups.map((group, index) => (
                  <Chip
                    key={`${index}-${group}`}
                    label={translate(group)}
                    variant={
                      activeMuscleGroup === group ? "filled" : "outlined"
                    }
                    color={activeMuscleGroup === group ? "primary" : "default"}
                    onClick={() => setActiveMuscleGroup(group)}
                    sx={{
                      color: "var(--text)",
                      borderColor: "var(--secondary)",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </SectionCard>

        {!mdUp && (
          <Fab
            onClick={() => setOpenCreateDialog(true)}
            sx={{
              position: "fixed",
              right: 16,
              bottom: 16,
              zIndex: 1300,
              backgroundColor: "var(--primary)",
              color: "var(--text)",
              "&:hover": { backgroundColor: "#E85C3F" },
            }}
          >
            <Add />
          </Fab>
        )}

        <ExercisesDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />

        {filteredExercises.length === 0 ? (
          <SectionCard>
            <Typography variant="h6">
              {translate("exercises_view.not_found")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {translate("exercises_view.not_found_suggestion")}
            </Typography>
          </SectionCard>
        ) : (
          Object.entries(groupedExercises).map(([group, items]) => (
            <>
              <Box key={group}>
                <SectionCard>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Box>
                      <Typography variant="h6">{translate(group)}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {items.length}{" "}
                        {items.length > 1
                          ? translate("exercises")
                          : translate("exercise")}
                      </Typography>
                    </Box>
                  </Stack>

                  <Grid container spacing={2}>
                    {items.map((exercise) => (
                      <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                        <ExerciseCard>
                          <CardContent>
                            <ExerciseCardHeader>
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={700}
                                >
                                  {translate(exercise?.key ?? exercise?.name)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {exercise?.category}
                                </Typography>
                              </Box>
                              <Chip
                                label={
                                  translate(exercise?.equipment?.key) ??
                                  exercise?.equipment?.name
                                }
                                size="small"
                                sx={{
                                  backgroundColor: "var(--secondary)",
                                  color: "var(--text)",
                                }}
                              />
                            </ExerciseCardHeader>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mb={2}
                            >
                              {exercise?.description}
                            </Typography>
                            {exercise?.imageUrl ? (
                              <ExerciseImage src={exercise?.imageUrl} alt="" />
                            ) : (
                              <ExerciseImageContainer>
                                <FitnessCenter
                                  sx={{
                                    color: "var(--secondary)",
                                    fontSize: 32,
                                  }}
                                />
                              </ExerciseImageContainer>
                            )}
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              <Chip
                                label={exercise?.muscleGroups?.name}
                                size="small"
                                sx={{
                                  backgroundColor: "var(--primary)",
                                  color: "var(--text)",
                                }}
                              />
                            </Stack>
                          </CardContent>
                        </ExerciseCard>
                      </Grid>
                    ))}
                  </Grid>
                </SectionCard>
              </Box>
            </>
          ))
        )}
      </Stack>
    </PageContainer>
  );
}

export default Exercises;
