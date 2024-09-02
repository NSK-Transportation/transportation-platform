import { Passenger, Refund } from "@/app/@types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  passenger: Required<Passenger>;
  reasons: Refund[];
  setPassenger: (data: Partial<Passenger>) => void;
}

export const useRefundTicket = create<Store>()(
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
    reasons: [{ id: 1, type: "delay", rus: "Опоздание" }],

    setPassenger: (data) =>
      set((state) => {
        state.passenger = { ...state.passenger, ...data };
      }),
  })),
);
