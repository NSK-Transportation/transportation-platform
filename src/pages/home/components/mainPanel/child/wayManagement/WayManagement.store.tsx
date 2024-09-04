import { Way, WayDetails } from "@/app/@types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  way: Way;
  wayDetails: WayDetails[]; // Исправление на правильное название

  setWay: (update: Partial<Way>) => void;
  setWayDetails: (wayDetails: WayDetails[]) => void;
}

export const useWayManagement = create<Store>()(
  immer((set) => ({
    way: {
      date: "",
      from: "",
      to: "",
    },
    wayDetails:[],
    setWay: (update: Partial<Way>) =>
      set((state) => ({
        way: {
          ...state.way,
          ...update,
        },
      })),

    setWayDetails: (wayDetails: WayDetails[]) =>
      set((state) => {
        state.wayDetails = wayDetails; 
      }),
  })),
);
