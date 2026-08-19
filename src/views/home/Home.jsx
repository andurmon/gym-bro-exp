import {
  Add,
  ChevronLeft,
  ChevronRight,
  FitnessCenter,
  PlayArrow,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PrimaryButton from "../../components/primary-button/PrimaryButton";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

const COLORS = {
  background: "#0B1E2E",
  surface: "#13324A",
  primary: "#FF6B4A",
  secondary: "#3E5A72",
  text: "#EAF2F5",
};

// -----------------------------------------------------------------------------
// Styled components
// -----------------------------------------------------------------------------

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: COLORS.background,
  color: COLORS.text,
  padding: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const PageHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
}));

const WeekContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(100px, 1fr))",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    overflowX: "auto",
    gridTemplateColumns: "repeat(7, 120px)",
    paddingBottom: theme.spacing(1),
  },
}));

const DayCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ selected }) => ({
  backgroundColor: selected ? COLORS.surface : COLORS.background,
  color: COLORS.text,
  border: selected
    ? `1px solid ${COLORS.primary}`
    : `1px solid ${COLORS.secondary}`,
  borderRadius: 12,
  padding: "14px 12px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  minHeight: 92,

  "&:hover": {
    borderColor: COLORS.primary,
    transform: "translateY(-2px)",
  },
}));

const WorkoutCard = styled(Card)(() => ({
  backgroundColor: COLORS.surface,
  color: COLORS.text,
  border: `1px solid ${COLORS.secondary}`,
  borderRadius: 14,
  boxShadow: "none",
}));

const ExerciseCard = styled(Card)(() => ({
  backgroundColor: COLORS.background,
  color: COLORS.text,
  border: `1px solid ${COLORS.secondary}`,
  borderRadius: 12,
  boxShadow: "none",
  transition: "border-color 0.2s ease",

  "&:hover": {
    borderColor: COLORS.primary,
  },
}));

const ExerciseImage = styled(Box)(() => ({
  width: 120,
  height: 90,
  borderRadius: 8,
  backgroundColor: COLORS.text,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}));

const SectionHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
}));

// -----------------------------------------------------------------------------
// Temporary data
// -----------------------------------------------------------------------------

const week = [
  {
    day: "MON",
    workout: "Push",
  },
  {
    day: "TUE",
    workout: "Rest",
  },
  {
    day: "WED",
    workout: "Pull",
  },
  {
    day: "THU",
    workout: "Rest",
  },
  {
    day: "FRI",
    workout: "Legs",
  },
  {
    day: "SAT",
    workout: "Rest",
  },
  {
    day: "SUN",
    workout: "Rest",
  },
];

const exercises = [
  {
    name: "Bench Press",
    sets: 4,
    reps: 8,
    muscle: "Chest",
  },
  {
    name: "Incline Dumbbell Press",
    sets: 3,
    reps: 10,
    muscle: "Chest",
  },
  {
    name: "Triceps Pushdown",
    sets: 3,
    reps: 12,
    muscle: "Triceps",
  },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

function Workouts() {
  return (
    <PageContainer>
      {/* Header */}
      <PageHeader>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.secondary,
              mt: 0.5,
            }}
          >
            Plan your training and own your week.
          </Typography>
        </Box>

        <PrimaryButton startIcon={<Add />}>Create Routine</PrimaryButton>
      </PageHeader>

      {/* Week navigation */}
      <SectionHeader>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: COLORS.text,
            }}
          >
            This Week
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: COLORS.secondary,
            }}
          >
            August 10 – August 16
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5}>
          <IconButton
            sx={{
              color: COLORS.text,
              border: `1px solid ${COLORS.secondary}`,
              borderRadius: 2,

              "&:hover": {
                borderColor: COLORS.primary,
                color: COLORS.primary,
              },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            sx={{
              color: COLORS.text,
              border: `1px solid ${COLORS.secondary}`,
              borderRadius: 2,

              "&:hover": {
                borderColor: COLORS.primary,
                color: COLORS.primary,
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      </SectionHeader>

      {/* Weekly plan */}
      <WeekContainer>
        {week.map((item, index) => {
          const isToday = index === 0;

          return (
            <DayCard key={item.day} selected={isToday} elevation={0}>
              <Typography
                variant="caption"
                sx={{
                  color: isToday ? COLORS.primary : COLORS.secondary,
                  fontWeight: 700,
                }}
              >
                {item.day}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color: COLORS.text,
                }}
              >
                {item.workout}
              </Typography>

              {isToday && (
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.primary,
                  }}
                >
                  Today
                </Typography>
              )}
            </DayCard>
          );
        })}
      </WeekContainer>

      {/* Today's workout */}
      <WorkoutCard>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <SectionHeader>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Today's Routine
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label="Push"
                  size="small"
                  sx={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.text,
                    fontWeight: 700,
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    color: COLORS.secondary,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  3 exercises
                </Typography>
              </Stack>
            </Box>

            <Button
              variant="outlined"
              startIcon={<PlayArrow />}
              sx={{
                color: COLORS.primary,
                borderColor: COLORS.primary,
                textTransform: "none",
                fontWeight: 600,

                "&:hover": {
                  borderColor: COLORS.primary,
                  backgroundColor: "rgba(255, 107, 74, 0.08)",
                },
              }}
            >
              Start Workout
            </Button>
          </SectionHeader>

          {/* Exercise list */}
          <Stack spacing={1.5}>
            {exercises.map((exercise) => (
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
                      <FitnessCenter
                        sx={{
                          color: COLORS.secondary,
                          fontSize: 32,
                        }}
                      />
                    </ExerciseImage>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: COLORS.text,
                        }}
                      >
                        {exercise.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: COLORS.secondary,
                          mt: 0.5,
                        }}
                      >
                        {exercise.muscle}
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
                          color: COLORS.primary,
                        }}
                      >
                        {exercise.sets} × {exercise.reps}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: COLORS.secondary,
                        }}
                      >
                        sets × reps
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </ExerciseCard>
            ))}
          </Stack>
        </CardContent>
      </WorkoutCard>
    </PageContainer>
  );
}

export default Workouts;
