import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as exercisesAPI from "../queries/exercises";

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

  return { useListAllExercises, useCreateExercise };
};
