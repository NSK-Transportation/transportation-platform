import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Link {
  [x: string]: any;
  text: string;
  to: string;
}

interface Store {
  links: { [key: string]: Link[] };
  linksNames: { [key: string]: string };
  activeLink: string | null;
  selectLink: (text: string) => void;
  setActiveLinkByRoute: () => void;
}

const useAsideStore = create<Store>()(
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
            ],
            dispatcher: [{ to: "/3", text: "Управление рейсами" }],
            administrator: [
              { to: "/4", text: "Автовокзал" },
              { to: "/5", text: "Права доступа" },
            ],
            // reporting: [{ to: "/6", text: "Отчёты" }],
            reference: [{ to: "/7", text: "Справочная" }],
          },

          linksNames: {
            cashier: "Кассир",
            dispatcher: "Диспетчер",
            administrator: "Администратор",
            reporting: "Модуль отчётности",
            reference: "Справочная",
          },

          activeLink: null,
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
        partialize: (state) => ({ activeLink: state.activeLink }),
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

export { useAsideStore };
