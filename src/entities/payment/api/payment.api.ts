import { axiosInstance } from "@/shared/api";
import { GetPaymentResponse, Payment } from "../model/types/payment.types";

export const paymentMutation = async (type: Payment["type"], data: Payment) => {
  const response = await axiosInstance.post<GetPaymentResponse>(`/payment?type=${type}`, {
    data,
  });

  return response.data;
};
