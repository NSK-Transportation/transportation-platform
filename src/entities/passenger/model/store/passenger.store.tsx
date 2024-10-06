/* eslint-disable @conarti/feature-sliced/layers-slices */
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
}

export const usePassengerStore = create<Store>()(
  devtools(
    immer((set) => ({
      passenger: {},
      passengers: [
        {
          id: 1,
          firstName: "Иван",
          lastName: "Иванов",
          patronymic: "Иванович",
          gender: "male",
          birthday: "",
          phone: {
            code: "+7",
            number: "123456789",
            refusalToProvide: false,
          },
          identification: {
            document: {
              series: "1234",
              number: "123456",
            },
            privilege: {
              series: "1234",
              number: "123456",
            },
            student: {},
            military: {},
            child: {},
          },
          ticket: {
            there: {
              seatId: 1,
            },
            return: {
              seatId: 2,
            },
          },
        },
      ],
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
            (passenger) =>
              passenger.id === id && {
                ...passenger,
                ...data,
              },
          ),
        }));
      },
    })),
    {
      name: "PassengerStore",
    },
  ),
);
