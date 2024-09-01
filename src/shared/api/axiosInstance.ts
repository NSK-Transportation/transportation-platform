import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // FIXME: Заменить базовый URL
  headers: {
    "Content-Type": "application/json",
  },
});
