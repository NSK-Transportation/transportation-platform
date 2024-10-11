/* eslint-disable @conarti/feature-sliced/absolute-relative */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { WayDetail } from "@/entities/wayDetails";
import { Direction } from "@/shared/types";
import { WayDetailStatus } from "../types/wayDetails.types";

// Интерфейс хранилища
export interface Store {
  selectedWayDetails: WayDetail["id"][];
  wayDetails: {
    there: WayDetail[] | null;
    return: WayDetail[] | null;
  };
  activeWay: {
    there: WayDetail | null;
    return: WayDetail | null;
  };
  options: {
    statuses: WayDetailStatus[];
  };

  setSelectedWayDetails: (id: WayDetail["id"]) => void;
  setWayDetails: (WayDetail: WayDetail[], direction: Direction) => void;
  setActiveWay: (way: WayDetail, direction: Direction) => void;
  updateActiveWay: (id: WayDetail["id"], direction: Direction, data: Partial<WayDetail>) => void;
}

export const useWayDetailStore = create<Store>()(
  devtools(
    immer((set) => ({
      selectedWayDetails: [],
      wayDetails: {
        there: [],
        return: [],
      },
      activeWay: {
        there: null,
        return: null,
      },
      options: {
        statuses: [
          {
            id: 1,
            name: "sale",
            rus: "Продажа",
          },
          {
            id: 2,
            name: "dispatched",
            rus: "Отправлен",
          },
          {
            id: 3,
            name: "closed",
            rus: "Закрыто",
          },
          {
            id: 4,
            name: "canceled",
            rus: "Отменено",
          },
          {
            id: 5,
            name: "delayed",
            rus: "Задержка",
          },
          {
            id: 6,
            name: "noSeats",
            rus: "Нет мест",
          },
        ],
      },

      setWayDetails: (wayDetail, direction) =>
        set((state) => {
          state.wayDetails[direction] = wayDetail;
        }),
      setSelectedWayDetails: (id) =>
        set((state) => {
          state.selectedWayDetails = [...state.selectedWayDetails, id];
        }),
      setActiveWay: (way, direction) =>
        set((state) => {
          state.activeWay[direction] = way;
        }),
      updateActiveWay: (id, direction, data) =>
        set((state) => {
          if (state.wayDetails && state.wayDetails[direction]) {
            state.wayDetails[direction] = state.wayDetails[direction].map((way) => {
              if (way.id === id) {
                const updatedWay = { ...way, ...data };

                if (state.activeWay[direction]?.id === id) {
                  state.activeWay[direction] = updatedWay;
                }

                return updatedWay;
              }
              return way;
            });
          }
        }),
    })),
    {
      name: "WayDetailsStore",
    },
  ),
);
