/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Passenger } from "@/entities/passenger";
import { axiosInstance } from "@/shared/api";
import { GetRefundResponse, PostRefundResponse, Refund } from "../model/types/refund.types";

export const getRefund = async (passengerId: Passenger["id"]) => {
  const response = await axiosInstance.get<GetRefundResponse>(`/refund`, {
    params: {
      passengerId: passengerId,
    },
  });

  return response.data;
};

export const postRefund = async (data: Refund) => {
  const response = await axiosInstance.post<PostRefundResponse>(`/refund`, {
    data,
  });

  return response.data;
};
