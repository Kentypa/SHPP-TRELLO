import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import api from "../config/api";
import { logout } from "../store/slices/authorization-slice";
import { store } from "../store/store";

export const instance = axios.create({
  baseURL: api.baseURL,
});

let refreshPromise: Promise<string | null> | null = null;

const handleUnauthorized = () => {
  localStorage.clear();
  store.dispatch(logout());
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
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      handleUnauthorized();
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const { data } = await axios.post<AxiosResponse<{ token: string }>>(
            `${api.baseURL}/refresh`,
            { refreshToken },
          );

          localStorage.setItem("token", data.token);
          return data.token;
        } catch {
          handleUnauthorized();
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const newToken = await refreshPromise;
    if (!newToken) return Promise.reject(error);

    config.headers.Authorization = `Bearer ${newToken}`;
    return instance(config);
  },
);

export default instance;
