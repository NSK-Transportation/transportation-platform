import { ReactNode } from "react";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AdminIcon, ReferenceIcon } from "@/shared/assets";

interface Link {
  text: string;
  to: string;
  slotsLeft?: ReactNode;
  slotsRight?: ReactNode;
}

interface Store {
  links: { [key: string]: Link[] };
  linksNames: { [key: string]: string };
  activeLink: string;

  selectLink: (text: string) => void;
}

export const useSidebarStore = create<Store>()(
  devtools(
    persist(
      immer((set, get) => ({
        links: {
          cashier: [
            { to: "/home/sale-ticket?step=0", text: "Продажа билетов" },
            { to: "/home/refund-ticket", text: "Возврат билетов" },
            { to: "/home/extra-baggage", text: "Багаж" },
          ],
          dispatcher: [{ to: "/home/way-management", text: "Управление рейсами" }],
          administrator: [{ slotsLeft: <AdminIcon />, to: "/4", text: "Админ-панель" }],
          reference: [{ slotsLeft: <ReferenceIcon />, to: "/6", text: "Справочная" }],
        },

        linksNames: {
          cashier: "Кассир",
          dispatcher: "Диспетчер",
          administrator: "",
          reporting: "Модуль отчётности",
          reference: "",
        },

        activeLink: "",

        selectLink: (text) => {
          const links = get().links;
          const currentLink = Object.values(links)
            .flat()
            .find((link) => link.text === text);
          if (currentLink) {
            set({ activeLink: currentLink.text });
          }
        },
      })),
      {
        name: "SidebarStore",
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ activeLink: state.activeLink }),
      },
    ),
    { name: "SidebarStore" },
  ),
);
