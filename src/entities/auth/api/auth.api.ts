import { axiosInstance } from "@/shared/api";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "@/shared/consts";
import { removeFromLocalStorage, setToLocalStorage } from "@/shared/helpers";
import { Authorization, GetAuthResponse } from "../model/types/auth.types";

export const loginMutation = async (data: Authorization) => {
  const response = await axiosInstance.post<GetAuthResponse>("/login", {
    data,
  });
  setToLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY, response.data.accessToken);
  return response.data.user;
};

export const logoutQuery = async () => {
  const response = await axiosInstance.get("/logout");
  removeFromLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  return response.data;
};
