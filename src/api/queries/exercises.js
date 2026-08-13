// import { createClient } from "@supabase/supabase-js";
// const listAllExercises = async (body = {}) => {
//   const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_ANON_KEY,
//   );
//   const { data, error } = await supabase.functions.invoke("exercises", {
//     body,
//   });
// };

import axios from "axios";
import { getApiConfig } from "./api-config";
const domain = "exercises";

const listAllExercises = async () => {
  const config = getApiConfig("get", domain);

  const response = await axios.request(config);
  return response.data;
};

const createExercise = async (data = {}) => {
  const config = getApiConfig("post", domain, data);

  const response = await axios.request(config);
  return response.data;
};

export { listAllExercises, createExercise };
