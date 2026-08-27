import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useTranslate } from "../../../../hooks/useTranslate";

import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Item = ({
  item,
  index,
  exercisesOptions = [],
  values,
  setFieldValue,
}) => {
  const { translate } = useTranslate();
  console.log("item: ", item);
  const exercises = values?.exercises;

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
      <FormControl fullWidth>
        <InputLabel id="exercise-label">{translate("exercise")}</InputLabel>
        <Select
          labelId="exercise-label"
          label={translate("exercise")}
          value={item.id}
          onChange={(event) =>
            setFieldValue(`exercises.[${index}].id`, event.target.value)
          }
        >
          {exercisesOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label={translate("workouts_view.sets")}
        type="number"
        value={item.sets ?? 0}
        onChange={(event) =>
          setFieldValue(`exercises.[${index}].sets`, Number(event.target.value))
        }
        inputProps={{ min: 1 }}
      />
      <TextField
        label={translate("workouts_view.reps")}
        type="number"
        value={item.reps ?? 0}
        onChange={(event) =>
          setFieldValue(`exercises.[${index}].reps`, Number(event.target.value))
        }
        inputProps={{ min: 1 }}
      />

      <IconButton
        aria-label={translate("exercises_view.add_exercise")}
        onClick={() =>
          setFieldValue(
            "exercises",
            exercises?.length === 1
              ? [{ id: null }]
              : exercises.filter((_, i) => i !== index),
          )
        }
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

const ExercisesList = ({ exercisesOptions = [] }) => {
  const { translate } = useTranslate();
  const { values, setFieldValue } = useFormikContext();

  return (
    <Stack spacing={1.5}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6">{translate("exercises")}</Typography>
        <IconButton
          aria-label={translate("exercises_view.add_exercise")}
          onClick={() =>
            setFieldValue("exercises", [...values.exercises, { id: null }])
          }
        >
          <AddIcon />
        </IconButton>
      </div>
      {values?.exercises.map((exercise, index) => (
        <Item
          key={index}
          item={exercise}
          index={index}
          exercisesOptions={exercisesOptions}
          values={values}
          setFieldValue={setFieldValue}
        />
      ))}
    </Stack>
  );
};

export default ExercisesList;
