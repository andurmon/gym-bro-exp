import { useMemo, useState } from "react";
import {
  Box,
  CardContent,
  Chip,
  Divider,
  Fab,
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
import { Search as SearchIcon, FitnessCenter, Add } from "@mui/icons-material";
import * as S from "./styles";
import { useExercises } from "../../api/hooks/useExercises";
import { useMuscleGroups } from "../../api/hooks/useMuscleGroups";
import { filterExercises } from "./utils/filter-exercises";
import { mapMuscleGroups } from "./utils/map-muscle-groups";
import { useEquipment } from "../../api/hooks/useEquipment";
import { mapDropdownList } from "../../commons/map-dropdown-list";
import { ALL_OPTION } from "../../commons/constants";

import { useTranslate } from "../../hooks/useTranslate";
import { MuscleGroupsChips } from "./components/muscle-groups-chips/MuscleGroupsChips";
import PrimaryButton from "../../components/primary-button/PrimaryButton";
import ExercisesGroupDisplay from "./components/exercises-group-display/ExercisesGroupDisplay";
import ExercisesDialog from "./components/exercise-dialog/ExercisesDialog";
import { ADD_MODE } from "./constants";

function Exercises() {
  const { translate, toggleLanguage } = useTranslate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMuscleGroup, setActiveMuscleGroup] = useState(ALL_OPTION);
  const [activeEquipment, setActiveEquipment] = useState(ALL_OPTION);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const { useListAllMuscleGroups } = useMuscleGroups();
  const muscleGroupsResult = useListAllMuscleGroups();

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
    <S.PageContainer>
      <Stack spacing={3}>
        <S.PageHeader>
          <Typography variant="body1" color="text.secondary">
            {translate("exercises_view.description")}
          </Typography>
          <PrimaryButton
            startIcon={<Add />}
            onClick={() => setOpenCreateDialog(true)}
          >
            {translate("exercises_view.add_exercise")}
          </PrimaryButton>
        </S.PageHeader>

        <S.SectionCard>
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
                <InputLabel id="equipment-filter-label">
                  {translate("equipment")}
                </InputLabel>
                <S.SelectEquipment
                  labelId="equipment-filter-label"
                  value={activeEquipment}
                  label={translate("equipment")}
                  onChange={(event) => setActiveEquipment(event.target.value)}
                >
                  {equipmentOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {translate(option)}
                    </MenuItem>
                  ))}
                </S.SelectEquipment>
              </FormControl>
            </Stack>

            <Divider sx={{ borderColor: "var(--secondary)" }} />

            <MuscleGroupsChips
              activeMuscleGroup={activeMuscleGroup}
              muscleGroups={muscleGroups}
              setActiveMuscleGroup={setActiveMuscleGroup}
            />
          </Stack>
        </S.SectionCard>

        <ExercisesDialog
          mode={ADD_MODE}
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        />

        {filteredExercises.length === 0 ? (
          <S.SectionCard>
            <Typography variant="h6">
              {translate("exercises_view.not_found")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {translate("exercises_view.not_found_suggestion")}
            </Typography>
          </S.SectionCard>
        ) : (
          Object.entries(groupedExercises).map(([group, items]) => (
            <ExercisesGroupDisplay key={group} group={group} items={items} />
          ))
        )}
      </Stack>
    </S.PageContainer>
  );
}

export default Exercises;
