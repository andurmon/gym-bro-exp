import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as workoutsAPI from "../queries/workouts";

export const useworkouts = () => {
  const queryClient = useQueryClient();

  const useGetWorkout = ({ id }) => {
    const queryResult = useQuery({
      queryKey: ["workouts", id],
      queryFn: () => workoutsAPI.getWorkout({ id }),
    });
    const data = queryResult?.data;
    return { ...queryResult, data };
  };
  const useListAllWorkouts = () => {
    const queryResult = useQuery({
      queryKey: ["workouts"],
      queryFn: workoutsAPI.listAllWorkouts,
    });
    const data = queryResult?.data;
    return { ...queryResult, data };
  };

  const useCreateWorkout = () =>
    useMutation({
      mutationFn: workoutsAPI.createWorkout,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workouts"] });
      },
    });

  return { useGetWorkout, useListAllWorkouts, useCreateWorkout };
};
