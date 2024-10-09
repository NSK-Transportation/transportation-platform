/* eslint-disable @conarti/feature-sliced/layers-slices */
import { PaymentType } from "@/entities/payment";

export interface Refund {
  withheld: number; // Удержано
  retentionPercentage: number; // Процент удержания
  amount: number; // Сумма возврата
  type: PaymentType; // Тип возврата
}
