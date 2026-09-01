import { Formik, Form } from "formik";
import WorkoutsForm from "./WorkoutsForm";

function WorkoutsFormView({ formConfig = {}, handleClose }) {
  const { handleSubmit, initialValues } = formConfig;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          {/* <WorkoutsForm handleClose={handleClose} /> */}
          <WorkoutsForm onSave={handleSubmit} />
        </Form>
      )}
    </Formik>
  );
}

export default WorkoutsFormView;
