import { create } from "zustand";

interface WayMenu {
  date: string;
  from: string;
  to: string;
}

interface WayMenuReturn {
  have: boolean;
  date: string;
  from: string;
  to: string;
}

interface Store {
  saleTicket: {
    way: WayMenu;
    returnWay: WayMenuReturn;
    setReturnWay: (data: WayMenuReturn) => void;
    setWay: (data: WayMenu) => void;
  };
}

const useMainStore = create<Store>((set) => ({
  saleTicket: {
    way: {
      date: "",
      from: "",
      to: "",
    },
    returnWay: {
      have: false,
      date: "",
      from: "",
      to: "",
    },

    setReturnWay: (data: WayMenuReturn) =>
      set((state) => ({ saleTicket: { ...state.saleTicket, returnWay: data } })),
    setWay: (data: WayMenu) => set((state) => ({ saleTicket: { ...state.saleTicket, way: data } })),
  },
}));

export { useMainStore };
