import { axiosInstance } from "@/shared/api/axiosInstance";
import { Baggage, QueryParams } from "../model/types/baggage.types";

export const postBaggage = async (data: QueryParams) => {
  const response = await axiosInstance.post<Baggage>(`/baggage`, {
    data,
  });

  return response.data;
};
