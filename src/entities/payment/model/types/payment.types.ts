import { Options } from "@/shared/types";

export enum PaymentType {
  CASH = "cash",
  CARD = "card",
  SBP = "sbp",
}

export interface Payment extends Options<PaymentType, "type"> {
  amount?: number;
}
