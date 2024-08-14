import { create } from "zustand";

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
}

const useAsideStore = create<Store>((set, get) => ({
  links: {
    cashier: [
      { to: "/home/sale-ticket?step=0", text: "Продажа билетов" },
      { to: "/2", text: "Возврат билетов" },
    ],
    dispatcher: [{ to: "/3", text: "Управление рейсами" }],
    administrator: [
      { to: "/4", text: "Автовокзал" },
      { to: "/5", text: "Права доступа" },
    ],
    reporting: [{ to: "/6", text: "Отчёты" }],
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
}));

export { useAsideStore };
