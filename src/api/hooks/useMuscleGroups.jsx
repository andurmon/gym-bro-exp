import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as muscleGroupsAPI from "../queries/muscle-groups";

export const useMuscleGroups = () => {
  const queryClient = useQueryClient();

  const useListAllMuscleGroups = () => {
    const queryResult = useQuery({
      queryKey: ["muscle-groups"],
      queryFn: muscleGroupsAPI.listAllMuscleGroups,
    });
    const data = queryResult?.data;
    return { ...queryResult, data };
  };

  return { useListAllMuscleGroups };
};
