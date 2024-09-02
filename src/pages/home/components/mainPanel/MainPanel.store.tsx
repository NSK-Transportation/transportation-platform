import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  // Хуки
  useSaleTicket,
  useRefundTicket,
  usePlusBaggage,
  useWayManagement,

  // Типизация
  SaleTicketStore,
  RefundTicketStore,
  PlusBaggageStore,
  WayManagementStore,
} from "./child";

// Интерфейс хранилища
interface Store {
  saleTicket: SaleTicketStore;
  refundTicket: RefundTicketStore;
  plusBaggage: PlusBaggageStore;
  wayManagement: WayManagementStore;
}

export const useMainStore = create<Store>()(
  devtools(
    (_set, _get) => ({
      saleTicket: useSaleTicket.getState(),
      refundTicket: useRefundTicket.getState(),
      plusBaggage: usePlusBaggage.getState(),
      wayManagement: useWayManagement.getState(),
    }),
    { name: "MainPanelStore" },
  ),
);
