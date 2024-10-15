/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useWayDetailStore, type Store as WayDetailStore } from "@/entities/wayDetails";
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
        main: [],
        child: [
          { id: 1, type: DiscountType.HALF, rus: "50% скидка" },
          { id: 2, type: DiscountType.FULL, rus: "100% скидка" },
        ],
      },
    },
  })),
);

useWayDetailStore.subscribe((state: WayDetailStore) => {
  useDiscountStore.setState(() => ({
    options: {
      discounts: {
        main: state.activeWay.there?.discounts,
      },
    },
  }));
});
