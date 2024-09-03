import { ManagementDate } from "@/app/@types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  wayDate: ManagementDate; // Убираем | null, так как состояние всегда должно быть определено
  setWayDate: (update: Partial<ManagementDate>) => void; // Метод для изменения даты и других данных
}

export const useWayManagement = create<Store>()(
  immer((set) => ({
    wayDate: {
      date: "30.02.2024", // Значение по умолчанию
      from: "2" // Значение по умолчанию
    },
    setWayDate: (update: Partial<ManagementDate>) =>
      set((state) => ({
        wayDate: {
          ...state.wayDate,
          ...update,
        },
      })),
  }))
);
