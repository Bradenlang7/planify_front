import axios from "axios";
import { getSecureData } from "../utils/SecureStorageService";

const instance = axios.create({
  baseURL: "http://192.168.0.100:8080",
});

//Attaches the JWT token to the auth header.
instance.interceptors.request.use(
  async (config) => {
    // Retrieve credentials (token) from secure storage
    const token = await getSecureData("token");
    if (token) {
      // Attach token only if it exists
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

export default instance;
