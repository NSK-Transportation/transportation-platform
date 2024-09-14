import { Passenger, WayDetails } from "@/app/@types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useSaleTicket, SaleTicketStore } from "../mainPanel";

// Интерфейс хранилища
export interface Store {
  activeWay: {
    there: WayDetails | null;
    return: WayDetails | null;
  };
  passengers: Passenger[];
  options: SaleTicketStore["options"];
}

export const useInformationStore = create<Store>()(
  devtools(
    immer((_set, _get) => ({
      activeWay: {
        there: useSaleTicket.getState().activeWay.there,
        return: useSaleTicket.getState().activeWay.return,
      },
      passengers: useSaleTicket.getState().passengers,
      options: useSaleTicket.getState().options,
    })),
    {
      name: "InformationPanel",
    },
  ),
);

useSaleTicket.subscribe((state) => {
  useInformationStore.setState({
    activeWay: {
      there: state.activeWay.there,
      return: state.activeWay.return,
    },
    passengers: state.passengers,
    options: state.options,
  });
});
