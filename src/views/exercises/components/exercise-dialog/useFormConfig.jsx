import { useExercises } from "../../../../api/hooks/useExercises";
import { ADD_MODE } from "../../constants";

/**
 *
 * @param {*} param0
 * @returns
 */
const useFormConfig = ({ mode = null, onClose = () => {} }) => {
  const { useCreateExercise, useUploadExerciseImage } = useExercises();
  const { mutateAsync: createExercise } = useCreateExercise();
  const { mutateAsync: uploadImage } = useUploadExerciseImage();

  const initialValues = {
    key: "",
    name: "",
    muscleGroupId: "",
    equipmentId: "",
    description: "",
    maxWeight: null,
    idealWeight: null,
    imageUrl: null,
    videoUrl: null,
    detailsUrl: null,
  };

  const handleCreate = async (payload) => {
    try {
      const result = await createExercise(payload);

      //   resetForm();
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
    const upsertExercise = mode === ADD_MODE ? handleCreate : handleEdit;
    const originalFile = payload?.files?.[0];
    const exercise = await upsertExercise(payload);

    if (exercise && originalFile) {
      const format = originalFile?.name?.split(".")?.[1];
      const timestampMs = Date.now();
      const newName = `${payload?.key || `${timestampMs}upload.bin`}.${format}`;

      // Create a new File object with the new name
      const renamedFile = new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });

      uploadImage({
        file: renamedFile,
        id: exercise?.id,
      });
    }
  };

  return { mode, handleSubmit, initialValues };
};

export default useFormConfig;
