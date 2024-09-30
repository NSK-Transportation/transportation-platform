import { Identification, Passenger } from "@/app/@types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  passenger: Partial<Passenger>;
  identification: Identification;
  setPassenger: (data: Partial<Passenger>) => void;
  setIdentification: (data: Identification) => void;
}

export const usePlusBaggage = create<Store>()(
  immer((set) => ({
    passenger: {},

    identification: {
      document: {
        series: "",
        number: "",
      },
    },

    setPassenger: (data) =>
      set((state) => {
        state.passenger = { ...state.passenger, ...data };
      }),

    setIdentification: (data) =>
      set((state) => {
        state.identification = { ...state.identification, ...data };
      }),
  })),
);
