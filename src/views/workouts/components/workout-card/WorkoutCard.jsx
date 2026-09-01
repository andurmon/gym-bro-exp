import { Stack, Typography, Divider, IconButton, Box } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { useTranslate } from "../../../../hooks/useTranslate";
import HorizontalScroller from "../../../../components/horizontal-scroller/HoriizontalScroller";
import useBreakpoints from "../../../../hooks/useBreakpoints";

import * as S from "../../styles";

function WorkoutCard({ workout }) {
  const { isSm } = useBreakpoints();
  const { translate } = useTranslate();

  const exercisesList = workout?.workout_exercise?.map(
    ({ exercises: exercise, sets, reps, id }) => (
      <S.ExerciseListItem key={id}>
        <S.ExerciseImg src={exercise?.image_url} alt={exercise.name} />
      </S.ExerciseListItem>
    ),
  );

  return (
    <S.WorkoutCardRoot elevation={0}>
      <Stack spacing={1}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h7" sx={{ color: "var(--text)" }}>
            {workout.name}
          </Typography>
          <IconButton
            size="small"
            onClick={() => console.log(`View workout ${workout.name}`)}
            sx={{ color: "var(--color-accent)" }}
          >
            <Visibility sx={{ height: "24px" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => console.log(`Edit workout ${workout.name}`)}
            sx={{ color: "var(--color-accent)" }}
          >
            <Edit sx={{ height: "24px" }} />
          </IconButton>
        </Box>
        {workout.description && (
          <Typography variant="body2" color="text.secondary">
            {workout.description}
          </Typography>
        )}

        {exercisesList?.length > 0 && (
          <>
            <Divider sx={{ borderColor: "var(--secondary)" }} />

            {isSm ? (
              <S.ExercisesContainer>{exercisesList}</S.ExercisesContainer>
            ) : (
              <HorizontalScroller scrollStep={200}>
                {exercisesList}
              </HorizontalScroller>
            )}
          </>
        )}

        <Divider sx={{ borderColor: "var(--secondary)" }} />

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {workout.category && (
            <S.CategoryChip size="small" label={translate(workout.category)} />
          )}
          {workout.type_of_training && (
            <S.TypeChip
              size="small"
              label={translate(workout.type_of_training)}
            />
          )}
        </Stack>
      </Stack>
    </S.WorkoutCardRoot>
  );
}

export default WorkoutCard;
