import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Formik, Form, useFormikContext } from "formik";
import { useExercises } from "../../../../api/hooks/useExercises";
import { useTranslate } from "../../../../hooks/useTranslate";
import ExercisesList from "../exercises-list/ExercisesList";

const WorkoutsForm = ({ handleClose }) => {
  const { translate } = useTranslate();
  const { values, setFieldValue, handleSubmit, isSubmitting } =
    useFormikContext();
  console.log("values: ", values);

  const { useListAllExercises } = useExercises();
  const exercisesResult = useListAllExercises();
  const exercises = Array.isArray(exercisesResult?.data)
    ? exercisesResult.data
    : [];

  const handleFieldChange = (field) => (event) => {
    setFieldValue(field, event.target.value);
  };

  return (
    <Stack spacing={2.5} sx={{ p: 2, mt: 1 }}>
      <TextField
        label={translate("name")}
        value={values.name}
        onChange={handleFieldChange("name")}
        fullWidth
      />
      <TextField
        label={translate("key")}
        value={values.key}
        onChange={handleFieldChange("key")}
        fullWidth
      />
      <TextField
        label={translate("description")}
        value={values.description}
        onChange={handleFieldChange("description")}
        fullWidth
      />
      <TextField
        label={translate("category")}
        value={values.category}
        onChange={handleFieldChange("category")}
        fullWidth
      />
      <TextField
        label={translate("type_of_training")}
        value={values.typeOfTraining}
        onChange={handleFieldChange("typeOfTraining")}
        fullWidth
      />

      <ExercisesList exercisesOptions={exercises} />

      <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{}}>
        <Button onClick={handleClose} disabled={isSubmitting}>
          {translate("cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || !values?.name?.trim()}
        >
          {isSubmitting ? (
            <CircularProgress size={20} />
          ) : (
            translate("workouts_view.save_workout")
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

function WorkoutsFormView({ formConfig = {}, handleClose }) {
  const { handleSubmit, initialValues } = formConfig;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <WorkoutsForm handleClose={handleClose} />
        </Form>
      )}
    </Formik>
  );
}

export default WorkoutsFormView;
