import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as equipmentAPI from "../queries/equipment";

export const useEquipment = () => {
  const queryClient = useQueryClient();

  const useListAllEquipment = () => {
    const queryResult = useQuery({
      queryKey: ["equipment"],
      queryFn: equipmentAPI.listAllEquipment,
    });
    const data = queryResult?.data;
    return { ...queryResult, data };
  };

  return { useListAllEquipment };
};
