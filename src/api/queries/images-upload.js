import axios from "axios";
import { getApiConfig } from "./api-config";

const domain = "upload-image";

const uploadImage = async (data = {}) => {
  //   const payload = {
  //     filename: "",
  //   };
  const config = getApiConfig("put", domain, data);
  config.headers["Content-Type"] = "multipart/form-data";
  const response = await axios.request(config);
  return response.data;
};

export { uploadImage };
