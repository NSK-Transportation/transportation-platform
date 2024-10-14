/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useWayDetailStore, type Store as WayDetailStore } from "@/entities/wayDetails";
import { Baggage } from "../types/baggage.types";

// Интерфейс хранилища
export interface Store {
  baggage: Baggage;

  addBaggage: () => void;
  removeBaggage: () => void;
}

export const useBaggageStore = create<Store>()(
  immer((set) => ({
    baggage: {
      available: 3,
      quantity: 0,
      price: 270,
    },

    addBaggage() {
      set((state) => {
        if (state.baggage.quantity < state.baggage.available) {
          state.baggage.quantity++;
        }
      });
    },
    removeBaggage() {
      set((state) => {
        if (state.baggage.quantity > 0) {
          state.baggage.quantity--;
        }
      });
    },
  })),
);

useWayDetailStore.subscribe((state: WayDetailStore) => {
  useBaggageStore.setState({
    baggage: {
      available: state.activeWay.there?.baggage.available ?? 0,
      price: state.activeWay.there?.baggage.price ?? 0,
    },
  });
});
