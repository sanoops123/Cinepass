
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_LOCAL

export const AxiosInstance =axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials:true
});
