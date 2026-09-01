import { useworkouts } from "../../../../api/hooks/useWorkouts";
import { ADD_MODE } from "../../constants";

/**
 *
 * @param {*} param0
 * @returns
 */
const useFormConfig = ({ mode = null, onClose = () => {} }) => {
  const { useCreateWorkout } = useworkouts();
  const { mutateAsync: createWorkout } = useCreateWorkout();

  const initialValues = {
    key: "",
    name: "",
    description: "",
    category: "",
    typeOfTraining: "",
    exercises: [{}],
  };

  const handleCreate = async (payload) => {
    try {
      const result = await createWorkout(payload);

      //! TODO   resetForm();
      onClose();
      return result;
    } catch (err) {
      // For now, let mutation handle error states. Could show a toast here.
      console.error("Failed to create exercise", err);
    }
  };

  const handleEdit = async (payload) => {
    try {
      console.info("EDIT NOT IMPLEMENTED YET");

      //   resetForm();
      onClose();
    } catch (err) {
      // For now, let mutation handle error states. Could show a toast here.
      console.error("Failed to edit exercise", err);
    }
  };

  const handleSubmit = async (payload = {}) => {
    const upsertWorkout = mode === ADD_MODE ? handleCreate : handleEdit;

    return await upsertWorkout(payload);
  };

  return { mode, handleSubmit, initialValues };
};

export default useFormConfig;
