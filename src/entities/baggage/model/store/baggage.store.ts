import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
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
      count: 0,
      price: 270,
    },

    addBaggage() {
      set((state) => {
        if (state.baggage.count < state.baggage.available) {
          state.baggage.count++;
        }
      });
    },
    removeBaggage() {
      set((state) => {
        if (state.baggage.count > 0) {
          state.baggage.count--;
        }
      });
    },
  })),
);
