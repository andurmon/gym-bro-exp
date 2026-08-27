import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as exercisesAPI from "../queries/exercises";
import * as uploadimageAPI from "../queries/images-upload";

export const useExercises = () => {
  const queryClient = useQueryClient();

  const useListAllExercises = () => {
    const queryResult = useQuery({
      queryKey: ["exercises"],
      queryFn: exercisesAPI.listAllExercises,
    });
    const data = queryResult?.data;
    return { ...queryResult, data };
  };

  const useCreateExercise = () =>
    useMutation({
      mutationFn: exercisesAPI.createExercise,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["exercises"] });
      },
    });

  const useUploadExerciseImage = () =>
    useMutation({
      mutationFn: uploadimageAPI.uploadImage,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["exercises"] });
      },
    });

  return { useListAllExercises, useCreateExercise, useUploadExerciseImage };
};
