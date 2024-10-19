import { axiosInstance } from "@/shared/api/axiosInstance";
import { Document, GetPassengerResponse } from "../model/types/passenger.types";

export const getPassenger = async (data: Document) => {
  const response = await axiosInstance.get<GetPassengerResponse>(`/passenger`, {
    params: {
      series: data.series,
      number: data.number,
    },
  });

  return response.data.passenger;
};
