import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Refund } from "../types/refund.types";

// Интерфейс хранилища
export interface Store {
  refund: Refund;
}

export const useRefundStore = create<Store>()(
  devtools(
    immer((set) => ({
      refund: {
        withheld: 0,
        retentionPercentage: 0,
        amount: 0,
        type: "card",
      },
    })),
    {
      name: "RefundStore",
    },
  ),
);
