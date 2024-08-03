import { create } from "zustand";

interface Text {
  user: string;
  id_user: string;
}

interface Store {
  text: { [key: string]: Text[] };
}

const useHeaderStore = create<Store>(() => ({
  text: {
    user: [{ user: "Иванова Диана", id_user: "ID: 000000" }],
  },
}));

export { useHeaderStore };
