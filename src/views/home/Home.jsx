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
import {
  getCurrentDayIndex,
  getCurrentDayName,
  getCurrentWeekDateRange,
  getWeek,
} from "./utils";
import WorkoutCard from "./components/workout-card/WorkoutCard";
import { useState } from "react";

// -----------------------------------------------------------------------------
// Temporary data
// -----------------------------------------------------------------------------

const Workouts = () => {
  const { isSm } = useBreakpoints();
  const { language, translate } = useTranslate();

  const currentDayName = getCurrentDayName();
  const [selectedDay, setSelectedDay] = useState(currentDayName);

  const { useListAllRoutines } = useRoutines();
  const { data: allRoutines, isLoading: isRoutinesLoading } =
    useListAllRoutines();
  const weekData = allRoutines?.[0] ?? {};
  const week = getWeek(weekData);

  const { useGetWorkout, useListAllWorkouts } = useworkouts();
  const { data: workoutOfTheDay, isLoading: isWorkoutLoading } = useGetWorkout({
    id: weekData?.[selectedDay]?.id,
  });

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
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            isWeekDataLoading={isRoutinesLoading}
            item={item}
            weekData={weekData}
          />
        ))}
      </WeekContainer>

      {/* Today's workout */}

      <WorkoutCard
        isWorkoutLoading={isWorkoutLoading}
        workoutData={workoutOfTheDay}
      />
    </PageContainer>
  );
};

export default Workouts;
