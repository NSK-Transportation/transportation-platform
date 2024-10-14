import { Options } from "@/shared/types";

export type PaymentType = "cash" | "card" | "sbp";

export interface Payment extends Options<PaymentType, "type"> {
  ticket?: {
    amount: number;
    there: {
      price: number;
    };
    return: {
      price: number;
    };
  };
  baggage?: {
    amount: number;
    quantity: number;
    there: {
      price: number;
    };
    return: {
      price: number;
    };
  };
  amount?: number;
}

export interface GetPaymentResponse {
  id: number;
  status: string;
  paid: boolean;
  amount: {
    value: number;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmationUrl: string;
    failUrl: string;
  };
  created_at: Date;
  description: string;
  refundable: boolean;
}
