import axios from "axios";
import { getApiConfig } from "./api-config";

const domain = "muscle-groups";

const listAllMuscleGroups = async () => {
  const config = getApiConfig("get", domain);

  const response = await axios.request(config);
  return response.data;
};

export { listAllMuscleGroups };
