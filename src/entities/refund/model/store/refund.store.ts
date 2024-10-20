/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Passenger, usePassengerStore, type Store as PassengerStore } from "@/entities/passenger";
import { Refund } from "../types/refund.types";

// Интерфейс хранилища
export interface Store {
  passenger: Passenger | null;
  refund: Refund | null;

  setRefund: (data: Refund) => void;
  clearRefund: () => void;
}

export const useRefundStore = create<Store>()(
  devtools(
    immer((set) => ({
      passenger: null,
      refund: null,

      setRefund(data) {
        set({
          refund: data,
        });
      },
      clearRefund: () => {
        set({
          passenger: null,
          refund: null,
        });
      },
    })),
    {
      name: "RefundStore",
    },
  ),
);

usePassengerStore.subscribe((state: PassengerStore) => {
  useRefundStore.setState({
    passenger: state.passenger,
  });
});
