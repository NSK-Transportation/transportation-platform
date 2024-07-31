import { create } from "zustand";

interface Text {
  user: string;
  id_user: string;
}

interface Store {
  Text: { [key: string]: Text[] };
}

const useHeaderStore = create<Store>(() => ({
  Text: {
    user: [{ user: "Иванова Диана", id_user: "ID: 000000" }],
  },
}));

export { useHeaderStore };
