import { Passenger, Refund } from "@/app/@types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  passenger: Partial<Passenger>;
  setPassenger: (data: Partial<Passenger>) => void;
}

export const useRefundTicket = create<Store>()(
  immer((set) => ({
    passenger: {
      identification: {
        document: {
          series: "",
          number: "",
        },
      },
      ticket: {
        there: {},
        return: {},
      },
    },

    setPassenger: (data) =>
      set((state) => {
        state.passenger = { ...state.passenger, ...data };
      }),
  })),
);
