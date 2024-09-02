import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useSaleTicket, useRefundTicket } from "./child";
import { SaleTicketStore } from "./child/saleTicket/SaleTicket.store";
import { RefundTicketStore } from "./child/refundTicket/RefundTicket.store";

// Интерфейс хранилища
interface Store {
  saleTicket: SaleTicketStore;
  refundTicket: RefundTicketStore;
}

export const useMainStore = create<Store>()(
  devtools(
    (_set, _get) => ({
      saleTicket: useSaleTicket.getState(),
      refundTicket: useRefundTicket.getState(),
    }),
    { name: "MainPanelStore" },
  ),
);
