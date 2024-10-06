/* eslint-disable @conarti/feature-sliced/absolute-relative */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Ticket, TicketType } from "../types/ticket.types";

// Интерфейс хранилища
export interface Store {
  options: {
    tickets: Partial<Ticket>[];
  };
}

export const useTicketStore = create<Store>()(
  devtools(
    immer((set) => ({
      options: {
        tickets: [
          {
            id: 1,
            type: TicketType.FULL,
            rus: "Полный",
          },
          {
            id: 2,
            type: TicketType.CHILD,
            rus: "Детский",
          },
          {
            id: 3,
            type: TicketType.DISCOUNT,
            rus: "Скидочный",
          },
          {
            id: 4,
            type: TicketType.PRIVILEGE,
            rus: "Льготный",
          },
        ],
      },
    })),
    {
      name: "TicketStore",
    },
  ),
);
