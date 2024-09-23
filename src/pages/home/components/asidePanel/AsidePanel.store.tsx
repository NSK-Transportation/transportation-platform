import { AdminIcon, ReferenceIcon } from "@/shared/assets";
import { ReactNode } from "react";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Link {
  [x: string]: any;
  text: string;
  to: string;
  slotsLeft?: ReactNode;
  slotsRight?: ReactNode;
}

interface Store {
  links: { [key: string]: Link[] };
  linksNames: { [key: string]: string };
  activeLink: string | null;
  appVersion: string;

  selectLink: (text: string) => void;
  setActiveLinkByRoute: () => void;
}

export const useAsideStore = create<Store>()(
  devtools(
    persist(
      immer((set, get) => {
        const setActiveLinkByRoute = () => {
          const currentPath = window.location.pathname;
          const links = get().links;

          for (const key in links) {
            const foundLink = links[key].find((link) => {
              const linkPath = new URL(link.to, window.location.origin).pathname;
              return linkPath === currentPath;
            });

            if (foundLink) {
              set({ activeLink: foundLink.text });
              break;
            }
          }
        };

        return {
          links: {
            cashier: [
              { to: "/home/sale-ticket?step=0", text: "Продажа билетов" },
              { to: "/home/refund-ticket", text: "Возврат билетов" },
              { to: "/home/plus-baggage", text: "Багаж" },
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

          activeLink: null,
          appVersion: "0.1.0",

          selectLink: (text) => {
            const links = get().links;
            const currentLink = Object.values(links)
              .flat()
              .find((link) => link.text === text);
            if (currentLink) {
              set({ activeLink: currentLink.text });
            }
          },
          setActiveLinkByRoute,
        };
      }),
      {
        name: "AsidePanelStore",
        version: 1,
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ activeLink: state.activeLink, appVersion: state.appVersion }),
        onRehydrateStorage: () => (state) => {
          if (!state?.activeLink) {
            state?.setActiveLinkByRoute?.();
          }
        },
      },
    ),
    { name: "AsidePanelStore" },
  ),
);
