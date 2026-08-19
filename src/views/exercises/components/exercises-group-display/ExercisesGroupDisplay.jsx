import { Box, Grid, Stack, Typography } from "@mui/material";
import { SectionCard } from "./styles";
import { useTranslate } from "../../../../hooks/useTranslate";
import ExerciseItem from "../exercise-item/ExerciseItem";

const ExercisesGroupDisplay = ({ group, items }) => {
  const { translate } = useTranslate();

  return (
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
              <ExerciseItem key={exercise.id} exercise={exercise} />
            ))}
          </Grid>
        </SectionCard>
      </Box>
    </>
  );
};

export default ExercisesGroupDisplay;
