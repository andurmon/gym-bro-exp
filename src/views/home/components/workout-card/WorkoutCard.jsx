import {
  Box,
  Button,
  CardContent,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CardStyled,
  ExerciseCard,
  ExerciseImage,
  SectionHeader,
} from "./styles";
import { useTranslate } from "../../../../hooks/useTranslate";
import { FitnessCenter, PlayArrow } from "@mui/icons-material";

const WorkoutCard = ({ isWorkoutLoading = false, workoutData = {} }) => {
  const { translate } = useTranslate();

  return (
    <CardStyled>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {isWorkoutLoading ? (
          <>
            <Skeleton />
          </>
        ) : (
          <>
            <SectionHeader>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {translate("workout_card.todays_routine")}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label={translate(workoutData?.category ?? "Rest Day")}
                    size="small"
                    sx={{
                      backgroundColor: "var(--primary)",
                      color: "var(--text)",
                      fontWeight: 700,
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--secondary)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {workoutData?.workout_exercise?.length}{" "}
                    {translate("workout_card.exercises")}
                  </Typography>
                </Stack>
              </Box>

              {false && (
                <Button
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  sx={{
                    color: "var(--primary)",
                    borderColor: "var(--primary)",
                    textTransform: "none",
                    fontWeight: 600,

                    "&:hover": {
                      borderColor: "var(--primary)",
                      backgroundColor: "rgba(255, 107, 74, 0.08)",
                    },
                  }}
                >
                  {translate("workout_card.start_workout")}
                </Button>
              )}
            </SectionHeader>

            {/* Exercise list */}
            <Stack spacing={1.5}>
              {workoutData?.workout_exercise?.map(
                ({ exercises: exercise, sets, reps }) => (
                  <ExerciseCard key={exercise.name}>
                    <CardContent
                      sx={{
                        p: 1.5,
                        "&:last-child": {
                          pb: 1.5,
                        },
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        {/* Future exercise illustration */}
                        <ExerciseImage>
                          {exercise.image_url ? (
                            <img src={exercise.image_url} height="100%" />
                          ) : (
                            <FitnessCenter
                              sx={{
                                color: "var(--secondary)",
                                fontSize: 32,
                              }}
                            />
                          )}
                        </ExerciseImage>

                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              color: "var(--text)",
                            }}
                          >
                            {translate(exercise.key) ?? exercise.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "var(--secondary)",
                              mt: 0.5,
                            }}
                          >
                            {translate(exercise.muscle_groups?.name) ??
                              exercise.muscle_group_id}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            textAlign: "right",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              color: "var(--primary)",
                            }}
                          >
                            {sets} × {reps}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: "var(--secondary)",
                            }}
                          >
                            {translate("workout_card.sets_reps")}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </ExerciseCard>
                ),
              )}
            </Stack>
          </>
        )}
      </CardContent>
    </CardStyled>
  );
};

export default WorkoutCard;
