/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Payment } from "../types/payment.types";

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
          { id: 1, type: "cash", rus: "Наличные" },
          { id: 2, type: "card", rus: "Карта" },
          { id: 3, type: "sbp", rus: "QR Код" },
        ],
      },
    })),
    {
      name: "PaymentStore",
    },
  ),
);
