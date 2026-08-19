import axios from "axios";
import { getApiConfig } from "./api-config";

const domain = "equipment";

const listAllEquipment = async () => {
  const config = getApiConfig("get", domain);

  const response = await axios.request(config);
  return response.data;
};

export { listAllEquipment };
