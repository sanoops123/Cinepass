import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

console.log("API_URL is:", API_URL);

export const AxiosInstance =axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials:true
});
