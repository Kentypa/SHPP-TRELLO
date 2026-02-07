import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import api from "../config/api";

export const instance = axios.create({
  baseURL: api.baseURL,
});

let refreshPromise: Promise<string | null> | null = null;

const logout = () => {
  localStorage.clear();
  window.location.href = "/sign-in";
};

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    config._retry = true;

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const { data } = await axios.post<{ token: string }>(
            `${api.baseURL}/refresh`,
            { refreshToken },
          );

          localStorage.setItem("token", data.token);
          return data.token;
        } catch {
          logout();
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const token = await refreshPromise;

    if (!token) return Promise.reject(error);

    config.headers.Authorization = `Bearer ${token}`;
    return instance(config);
  },
);

export default instance;
