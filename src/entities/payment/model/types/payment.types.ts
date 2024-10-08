import { Options } from "@/shared/types";

export type PaymentType = "cash" | "card" | "sbp";

export interface Payment extends Options<PaymentType, "type"> {
  amount?: number;
}
