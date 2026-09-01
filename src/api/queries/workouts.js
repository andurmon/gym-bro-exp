import axios from "axios";
import { getApiConfig } from "./api-config";

const domain = "workouts";

const getWorkout = async ({ id }) => {
  const config = getApiConfig("get", domain, null, { expand: true }, id);

  const response = await axios.request(config);
  return response.data;
};
const listAllWorkouts = async () => {
  const config = getApiConfig("get", domain, null, { expand: true });

  const response = await axios.request(config);
  return response.data;
};

const createWorkout = async (data = {}) => {
  const config = getApiConfig("post", domain, data);

  const response = await axios.request(config);
  return response.data;
};

export { getWorkout, listAllWorkouts, createWorkout };
