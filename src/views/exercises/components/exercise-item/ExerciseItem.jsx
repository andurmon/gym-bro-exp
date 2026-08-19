import { Box, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import {
  ExerciseCard,
  ExerciseCardHeader,
  ExerciseImage,
  ExerciseImageContainer,
} from "./styles";
import { FitnessCenter } from "@mui/icons-material";
import { useTranslate } from "../../../../hooks/useTranslate";

const ExerciseItem = ({ exercise }) => {
  const { translate } = useTranslate();

  return (
    <Grid item xs={12} sm={6} md={4} key={exercise.id}>
      <ExerciseCard>
        <CardContent>
          <ExerciseCardHeader>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                {translate(exercise?.key ?? exercise?.name)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exercise?.category}
              </Typography>
            </Box>
            <Chip
              label={
                translate(exercise?.equipment?.key) ?? exercise?.equipment?.name
              }
              size="small"
              sx={{
                backgroundColor: "var(--secondary)",
                color: "var(--text)",
              }}
            />
          </ExerciseCardHeader>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {exercise?.description}
          </Typography>
          {exercise?.imageUrl ? (
            <>
              {/* <img src={exercise?.imageUrl}></img> */}
              <ExerciseImage src={exercise?.imageUrl} alt="" />
            </>
          ) : (
            <ExerciseImageContainer>
              <FitnessCenter
                sx={{
                  color: "var(--secondary)",
                  fontSize: 32,
                }}
              />
            </ExerciseImageContainer>
          )}
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
  );
};

export default ExerciseItem;
