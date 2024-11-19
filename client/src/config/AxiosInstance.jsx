/*
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const AxiosInstance =axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials:true
});
*/
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PRODUCTION;

export const AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});
