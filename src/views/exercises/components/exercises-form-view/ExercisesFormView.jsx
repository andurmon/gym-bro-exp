import { Button, CircularProgress, Stack } from "@mui/material";
import { Formik, Form, Field } from "formik";
import ExercisesForm from "./components/ExercisesForm";
import { useTranslate } from "../../../../hooks/useTranslate";

const ExercisesFormView = ({
  formConfig = {},
  muscleGroupsResult,
  equipmentResult,
  handleClose,
}) => {
  const { translate } = useTranslate();
  const { mode, handleSubmit, initialValues } = formConfig || {};

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit, isSubmitting, values }) => (
        <>
          <Form>
            <ExercisesForm
              mode={mode}
              equipmentResult={equipmentResult}
              muscleGroupsResult={muscleGroupsResult}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button onClick={handleClose} disabled={isSubmitting}>
                {translate("cancel")}
              </Button>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting || !values?.name?.trim()}
              >
                {isSubmitting ? <CircularProgress size={20} /> : "Create"}
              </Button>
            </Stack>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default ExercisesFormView;
