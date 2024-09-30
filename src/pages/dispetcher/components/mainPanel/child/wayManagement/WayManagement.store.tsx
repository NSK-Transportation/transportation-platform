import { Way, WayDetails } from "@/app/@types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Store {
  way: Way;
  wayDetails: WayDetails[];
  selectedWays: WayDetails[];

  setWay: (update: Partial<Way>) => void;
  setWayDetails: (wayDetails: WayDetails[]) => void;
  toggleSelectWay: (way: WayDetails) => void;
}

export const useWayManagement = create<Store>()(
  immer((set) => ({
    way: {
      date: "13.09.2024",
      from: "qqq",
      to: "qqq",
    },
    wayDetails: [],
    selectedWays: [],

    setWay: (update: Partial<Way>) =>
      set((state) => {
        state.way = { ...state.way, ...update };
      }),

    setWayDetails: (wayDetails: WayDetails[]) =>
      set((state) => {
        state.wayDetails = wayDetails;
      }),

    toggleSelectWay: (way: WayDetails) =>
      set((state) => {
        const isSelected = state.selectedWays.some((selectedWay) => selectedWay.id === way.id);
        if (isSelected) {
          state.selectedWays = state.selectedWays.filter(
            (selectedWay) => selectedWay.id !== way.id,
          );
        } else {
          state.selectedWays.push(way);
        }
      }),
  })),
);
