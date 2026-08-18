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
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  ExerciseCard,
  ExerciseCardHeader,
  PageContainer,
  SectionCard,
} from "./styles";
import { useExercises } from "../../api/hooks/useExercises";
import { useMuscleGroups } from "../../api/hooks/useMuscleGroups";
import { filterExercises } from "./utils/filter-exercises";
import { mapMuscleGroups } from "./utils/map-muscle-groups";
import { useEquipment } from "../../api/hooks/useEquipment";
import { mapDropdownList } from "./utils/map-dropdown-list";

function Exercises() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMuscleGroup, setActiveMuscleGroup] = useState("All");
  const [activeEquipment, setActiveEquipment] = useState("All");

  const { useListAllMuscleGroups } = useMuscleGroups();
  const muscleGroupsResult = useListAllMuscleGroups();

  const muscleGroups = useMemo(
    () => ["All", ...mapDropdownList(muscleGroupsResult?.data)],
    [muscleGroupsResult?.data],
  );
  console.log("muscleGroups: ", muscleGroups);

  const { useListAllEquipment } = useEquipment();
  const equipmentResult = useListAllEquipment();
  console.log("equipmentResult: ", equipmentResult);

  const equipmentOptions = useMemo(
    () => ["All", ...mapDropdownList(equipmentResult?.data)],
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
            Browse exercises by muscle group, filter by equipment, and search
            the library.
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
                placeholder="Search exercises..."
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
                  label="Equipment"
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
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Divider sx={{ borderColor: "var(--secondary)" }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Filter by muscle group
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {muscleGroups.map((group) => (
                  <Chip
                    key={group}
                    label={group}
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

        {filteredExercises.length === 0 ? (
          <SectionCard>
            <Typography variant="h6">No exercises found</Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters to see more results.
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
                      <Typography variant="h6">{group}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {items.length} exercise{items.length > 1 ? "s" : ""}
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
                                  {exercise?.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {exercise?.category}
                                </Typography>
                              </Box>
                              <Chip
                                label={exercise?.equipment?.name}
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
