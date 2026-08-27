import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import * as S from "./styles";
import PrimaryButton from "../../components/primary-button/PrimaryButton";
import { useTranslate } from "../../hooks/useTranslate";
import WorkoutCard from "./components/workout-card/WorkoutCard";
import WorkoutDialog from "./components/workout-dialog/WorkoutDialog";
import { useworkouts } from "../../api/hooks/useWorkouts";
import { ADD_MODE } from "./constants";

function Workouts() {
  const { translate } = useTranslate();

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const { useListAllWorkouts } = useworkouts();
  const { data: workouts = [], isFetched } = useListAllWorkouts();

  return (
    <S.PageContainer>
      <Stack spacing={3}>
        <S.PageHeader>
          <Typography variant="body1" color="text.secondary">
            {translate("workouts_view.description")}
          </Typography>
          <PrimaryButton
            startIcon={<Add />}
            onClick={() => setOpenCreateDialog(true)}
          >
            {translate("workouts_view.create_workout")}
          </PrimaryButton>
        </S.PageHeader>

        <WorkoutDialog
          mode={ADD_MODE}
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        />

        {isFetched && workouts?.length === 0 ? (
          <S.EmptyStateCard>
            <Typography variant="h6" sx={{ color: "var(--text)" }}>
              {translate("workouts_view.not_found")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {translate("workouts_view.not_found_suggestion")}
            </Typography>
          </S.EmptyStateCard>
        ) : (
          <S.WorkoutsGrid>
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </S.WorkoutsGrid>
        )}
      </Stack>
    </S.PageContainer>
  );
}

export default Workouts;
