import axios, { AxiosError } from "axios";
import api from "../config/api";

const instance = axios.create({ baseURL: api.baseURL });

instance.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message || error.message || "Undefined error";
    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  },
);

export default instance;
