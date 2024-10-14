import { authHandlers } from "@/entities/auth";
import { paymentHandlers } from "@/entities/payment";
import { wayHandlers } from "@/entities/way";

export const handlers = [...authHandlers, ...wayHandlers, ...paymentHandlers];
