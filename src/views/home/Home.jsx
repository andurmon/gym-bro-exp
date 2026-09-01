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
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PrimaryButton from "../../components/primary-button/PrimaryButton";
import {
  PageContainer,
  PageHeader,
  WeekContainer,
  ExerciseCard,
  ExerciseImage,
  SectionHeader,
} from "./styles";
import DayCard from "./components/day-card/DayCard";
import useBreakpoints from "../../hooks/useBreakpoints";
import { useRoutines } from "../../api/hooks/useRoutines";
import { useworkouts } from "../../api/hooks/useWorkouts";
import { useTranslate } from "../../hooks/useTranslate";
import { getCurrentWeekDateRange, week } from "./utils";
import WorkoutCard from "./components/workout-card/WorkoutCard";

// -----------------------------------------------------------------------------
// Temporary data
// -----------------------------------------------------------------------------

const Workouts = () => {
  const { isSm } = useBreakpoints();
  const { language, translate } = useTranslate();
  const { data: weekData, isLoading: isWeekDataLoading } =
    useRoutines().useListAllRoutines();
  console.log("weekData: ", weekData);

  const { useGetWorkout } = useworkouts();
  const { data: workoutData, isLoading: isWorkoutLoading } = useGetWorkout({
    id: weekData?.[0]?.monday?.id,
  });
  console.log("workoutData: ", workoutData);

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "var(--secondary)",
              mt: 0.5,
            }}
          >
            {translate("home_view.description")}
          </Typography>
        </Box>

        <PrimaryButton startIcon={<Add />}>
          {translate("home_view.create_routine")}
        </PrimaryButton>
      </PageHeader>

      {/* Week navigation */}
      <SectionHeader>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "var(--text)",
            }}
          >
            {translate("home_view.this_week")}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--secondary)",
            }}
          >
            {getCurrentWeekDateRange(language)}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5}>
          <IconButton
            sx={{
              color: "var(--text)",
              border: "1px solid var(--secondary)",
              borderRadius: 2,

              "&:hover": {
                borderColor: "var(--primary)",
                color: "var(--primary)",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            sx={{
              color: "var(--text)",
              border: "1px solid var(--secondary)",
              borderRadius: 2,

              "&:hover": {
                borderColor: "var(--primary)",
                color: "var(--primary)",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      </SectionHeader>

      {/* Weekly plan */}
      <WeekContainer>
        {week.map((item, index) => (
          <DayCard
            key={item.day}
            isWeekDataLoading={isWeekDataLoading}
            item={item}
            isToday={index === 0}
            weekData={weekData}
          />
        ))}
      </WeekContainer>

      {/* Today's workout */}

      <WorkoutCard
        isWorkoutLoading={isWorkoutLoading}
        workoutData={workoutData}
      />
    </PageContainer>
  );
};

export default Workouts;
