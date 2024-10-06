/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Payment, PaymentType } from "../types/payment.types";

// Интерфейс хранилища
export interface Store {
  options: {
    payments: Payment[];
  };
}

export const usePaymentStore = create<Store>()(
  devtools(
    immer((set) => ({
      options: {
        payments: [
          { id: 1, type: PaymentType.CASH, rus: "Наличные" },
          { id: 2, type: PaymentType.CARD, rus: "Карта" },
          { id: 3, type: PaymentType.SBP, rus: "QR Код" },
        ],
      },
    })),
    {
      name: "PaymentStore",
    },
  ),
);
