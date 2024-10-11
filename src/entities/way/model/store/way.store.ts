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
        cities: [
          {
            id: 1,
            name: "Novosibirsk",
            rus: "Новосибирск",
            stations: [
              {
                id: 1,
                name: "AB Main",
                rus: "АВ Главный",
              },
              {
                id: 2,
                name: "Railway",
                rus: "Железнодорожный",
              },
            ],
          },
          {
            id: 2,
            name: "Krasnoyarsk",
            rus: "Красноярск",
            stations: [
              {
                id: 1,
                name: "AB Krasnoyarsk",
                rus: "АВ Красноярск",
              },
            ],
          },
        ],
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
    })),
    {
      name: "WayStore",
    },
  ),
);
