import {
  Baggage,
  Discount,
  Document,
  Gender,
  Passenger,
  Payment,
  Privilege,
  Ticket,
  WayDetails,
} from "@/app/@types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useSaleTicket } from "../mainPanel";

// Интерфейс хранилища
export interface Store {
  activeWay: {
    there: WayDetails | null;
    return: WayDetails | null;
  };
  passengers: Passenger[];
  options: {
    tickets: Partial<Ticket>[];
    discounts_main: Discount[];
    discounts_child: Discount[];
    baggages: Baggage[];
    documents: Document[];
    privileges: Privilege[];
    payments: Payment[];
    genders: Gender[];
  };
}

export const useInformationStore = create<Store>()(
  devtools(
    immer((_set, _get) => ({
      activeWay: {
        there: useSaleTicket.getState().activeWay.there,
        return: useSaleTicket.getState().activeWay.return,
      },
      passengers: useSaleTicket.getState().passengers,
      options: {
        tickets: useSaleTicket.getState().tickets,
        discounts_main: useSaleTicket.getState().discount.main,
        discounts_child: useSaleTicket.getState().discount.child,
        baggages: useSaleTicket.getState().baggages,
        documents: useSaleTicket.getState().documents,
        privileges: useSaleTicket.getState().privileges,
        payments: useSaleTicket.getState().payments,
        genders: useSaleTicket.getState().genders,
      },
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
    options: {
      tickets: state.tickets,
      discounts_main: state.discount.main,
      discounts_child: state.discount.child,
      baggages: state.baggages,
      documents: state.documents,
      privileges: state.privileges,
      payments: state.payments,
      genders: state.genders,
    },
  });
});
