import { Typography } from "@mui/material";
import { useTranslate } from "../../../../hooks/useTranslate";
import { ChipsContainer, Chip, Stack } from "./styles";

const MuscleGroupsChips = ({
  activeMuscleGroup,
  muscleGroups,
  setActiveMuscleGroup,
}) => {
  const { translate } = useTranslate();
  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        {translate("exercises_view.filter_muscle_group", "M")}
      </Typography>
      <ChipsContainer>
        <Stack direction="row">
          {muscleGroups.map((group, index) => (
            <Chip
              key={`${index}-${group}`}
              label={translate(group)}
              variant={activeMuscleGroup === group ? "filled" : "outlined"}
              color={activeMuscleGroup === group ? "primary" : "default"}
              onClick={() => setActiveMuscleGroup(group)}
            />
          ))}
        </Stack>
      </ChipsContainer>
    </>
  );
};

export { MuscleGroupsChips };
