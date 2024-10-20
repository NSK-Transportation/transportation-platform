import { authHandlers } from "@/entities/auth";
import { passengerHandlers } from "@/entities/passenger";
import { paymentHandlers } from "@/entities/payment";
import { refundHandlers } from "@/entities/refund";
import { wayHandlers } from "@/entities/way";

export const handlers = [
  ...authHandlers,
  ...wayHandlers,
  ...paymentHandlers,
  ...passengerHandlers,
  ...refundHandlers,
];
