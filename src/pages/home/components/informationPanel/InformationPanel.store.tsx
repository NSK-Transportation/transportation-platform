import { Passenger, WayDetails } from "@/app/@types";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useSaleTicket } from "../mainPanel";

// Интерфейс хранилища
export interface Store {
  activeWay: {
    there: WayDetails | null;
    return: WayDetails | null;
  };
  passengers: Passenger[];
}

export const useInformationStore = create<Store>()(
  subscribeWithSelector(
    devtools(
      immer((_set, _get) => ({
        activeWay: {
          there: useSaleTicket.getState().activeWay.there,
          return: useSaleTicket.getState().activeWay.return,
        },
        passengers: useSaleTicket.getState().passengers,
      })),
      {
        name: "InformationPanel",
      },
    ),
  ),
);

useSaleTicket.subscribe((state) => {
  useInformationStore.setState({
    activeWay: {
      there: state.activeWay.there,
      return: state.activeWay.return,
    },
  });
});
