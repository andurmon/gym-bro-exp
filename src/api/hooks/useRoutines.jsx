import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as routinesAPI from "../queries/routine";

export const useRoutines = () => {
  //   const queryClient = useQueryClient();

  const useListAllRoutines = () => {
    const queryResult = useQuery({
      queryKey: ["routines"],
      queryFn: routinesAPI.getRoutine,
    });
    const data = queryResult?.data;
    return { ...queryResult, data };
  };

  return { useListAllRoutines };
};
