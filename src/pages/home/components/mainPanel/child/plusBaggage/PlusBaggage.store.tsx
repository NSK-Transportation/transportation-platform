import { Passenger } from "@/app/@types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  passenger: Required<Passenger>;
  setPassenger: (data: Partial<Passenger>) => void;
}

export const usePlusBaggage = create<Store>()(
  immer((set) => ({
    passenger: {
      id: 0,
      firstName: "",
      lastName: "",
      patronymic: "",
      gender: null,
      birthday: "",
      phone: "",
      identification: null,
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
