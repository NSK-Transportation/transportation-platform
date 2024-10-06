import { axiosInstance } from "@/shared/api/axiosInstance";
import { Authorization } from "../model/types/auth.types";

export const loginMutation = async (data: Authorization) => {
  const response = await axiosInstance.post("/login", {
    data,
  });

  return response.data;
};
