/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { City } from "@/entities/city";
import { Way } from "../types/way.types";

// Интерфейс хранилища
export interface Store {
  remoteSale: boolean;
  returnHave: boolean;
  way: Way;
  options: {
    cities: City[];
  };

  setWay: (way: Way) => void;
  setRemoteSale: (remoteSale: boolean) => void;
  setReturnHave: (returnHave: boolean) => void;
  setOption: (
    name: keyof Store["options"],
    option: Store["options"][keyof Store["options"]],
  ) => void;
}

export const useWayStore = create<Store>()(
  devtools(
    immer((set) => ({
      remoteSale: false,
      returnHave: false,
      way: {
        date: null,
        from: {
          city: null,
          station: null,
        },
        to: {
          city: null,
          station: null,
        },
      },
      options: {
        cities: [],
      },

      setWay: (way) => {
        set((state) => {
          state.way = way;
        });
      },
      setRemoteSale: (remoteSale) => {
        set((state) => {
          state.remoteSale = remoteSale;
        });
      },
      setReturnHave: (returnHave) => {
        set((state) => {
          state.returnHave = returnHave;
        });
      },
      setOption: (name, option) => {
        set((state) => {
          state.options[name] = option;
        });
      },
    })),
    {
      name: "WayStore",
    },
  ),
);
