/* eslint-disable @conarti/feature-sliced/layers-slices */
import { Payment } from "@/entities/payment";
import { Status } from "@/shared/types";

export interface Refund {
  withheld: number; // Удержано
  retentionPercentage: number; // Процент удержания
  amount: number; // Сумма возврата
  payment: Pick<Payment, "id" | "type" | "rus">; // Тип возврата
}

export interface Form {
  name: string;
}

export interface GetRefundResponse {
  refund: Refund;
  form: Form;
}

export interface PostRefundResponse {
  status: Status;
}
