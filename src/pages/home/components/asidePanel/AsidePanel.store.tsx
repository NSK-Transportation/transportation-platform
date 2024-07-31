import { create } from "zustand";

interface Link {
  text: string;
  to: string;
}

interface Store {
  links: { [key: string]: Link[] };
  linksNames: { [key: string]: string };
  selectedLink: string | null;
  selectLink: (to: string) => void;
}

const useAsideStore = create<Store>((set) => ({
  links: {
    cashier: [
      { to: "/1", text: "Продажа билетов" },
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
  selectedLink: null,
  selectLink: (text) => set({ selectedLink: text }),
}));

export { useAsideStore };
