/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Discount, DiscountType } from "../types/discount.types";

// Интерфейс хранилища
export interface Store {
  options: {
    discounts: {
      main: Discount[];
      child: Discount[];
    };
  };
}

export const useDiscountStore = create<Store>()(
  immer((set) => ({
    options: {
      discounts: {
        main: [
          { id: 1, type: DiscountType.MILITARY, rus: "50% СВО" },
          { id: 2, type: DiscountType.STUDENT, rus: "50% Студент" },
        ],
        child: [
          { id: 1, type: DiscountType.HALF, rus: "50% скидка" },
          { id: 2, type: DiscountType.FULL, rus: "100% скидка" },
        ],
      },
    },
  })),
);
