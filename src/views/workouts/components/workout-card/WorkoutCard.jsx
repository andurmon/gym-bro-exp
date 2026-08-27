import { Stack, Typography, Divider } from "@mui/material";
import * as S from "../../styles";
import { useTranslate } from "../../../../hooks/useTranslate";

function WorkoutCard({ workout }) {
  const { translate } = useTranslate();

  return (
    <S.WorkoutCardRoot elevation={0}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ color: "var(--text)" }}>
          {workout.name}
        </Typography>

        {workout.description && (
          <Typography variant="body2" color="text.secondary">
            {workout.description}
          </Typography>
        )}

        <Divider sx={{ borderColor: "var(--secondary)" }} />

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {workout.category && (
            <S.CategoryChip
              size="small"
              label={translate(workout.category) || workout.category}
            />
          )}
          {workout.type_of_training && (
            <S.TypeChip
              size="small"
              label={
                translate(workout.type_of_training) || workout.type_of_training
              }
            />
          )}
        </Stack>
      </Stack>

      {workout?.exercises?.length > 0 && (
        <>
          <Divider sx={{ borderColor: "var(--secondary)" }} />

          <Stack>
            {workout.exercises?.map((exercise) => (
              <S.ExerciseListItem key={exercise.tempId}>
                <Typography variant="body2" sx={{ color: "var(--text)" }}>
                  {exercise.exerciseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {exercise.sets}×{exercise.reps}
                </Typography>
              </S.ExerciseListItem>
            ))}
          </Stack>
        </>
      )}
    </S.WorkoutCardRoot>
  );
}

export default WorkoutCard;
