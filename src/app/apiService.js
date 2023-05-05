import { TMDB_BASE_URL } from "./config";
import axios from "axios";

const apiService = axios.create({
  baseURL: TMDB_BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export const get = async (endpoint, params) => {
  try {
    const response = await apiService.get(`${endpoint}?${params}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default apiService;
