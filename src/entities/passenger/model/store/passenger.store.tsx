import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  Document,
  DocumentType,
  Passenger,
  Privilege,
  PrivilegeType,
} from "../types/passenger.types";

// Интерфейс хранилища
export interface Store {
  passenger: Partial<Passenger>;
  passengers: Passenger[];
  options: {
    documents: Omit<Document, "series" | "number">[];
    privileges: Omit<Privilege, "series" | "number">[];
  };

  setPassenger: (passenger: Passenger) => void;
  setPassengers: (newPassenger: Passenger) => void;
  updatePassenger: (id: Passenger["id"], data: Partial<Passenger>) => void;
  clearPassenger: (id: Passenger["id"]) => void;

  formFullfield: boolean;
  setFormFullfield: (fullfield: boolean) => void;
}

export const usePassengerStore = create<Store>()(
  devtools(
    immer((set) => ({
      passenger: {},
      passengers: [],
      options: {
        documents: [
          { id: 1, type: DocumentType.PASSPORT, rus: "Паспорт" },
          { id: 2, type: DocumentType.DRIVER, rus: "Водительские" },
        ],
        privileges: [
          { id: 1, type: PrivilegeType.STUDENT, rus: "Студент" },
          { id: 2, type: PrivilegeType.MILITARY, rus: "СВО" },
        ],
      },

      setPassenger(passenger) {
        set((state) => {
          state.passenger = passenger;
        });
      },
      setPassengers(newPassenger) {
        set((state) => {
          state.passengers.push(newPassenger);
        });
      },
      updatePassenger: (id, data) => {
        set((state) => ({
          passengers: state.passengers.map(
            (passenger) => passenger.id === id && { ...passenger, ...data },
          ),
        }));
      },
      clearPassenger: (id) => {
        set((state) => ({
          passengers: state.passengers.filter((passenger) => passenger.id !== id),
        }));
      },

      formFullfield: false,
      setFormFullfield: (fullfield) => {
        set((state) => {
          state.formFullfield = fullfield;
        });
      },
    })),
    {
      name: "PassengerStore",
    },
  ),
);
