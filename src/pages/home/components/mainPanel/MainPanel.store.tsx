import { create } from "zustand";

export interface Location {
  city: string;
  street: string;
  house: string;
  station: string;
  time: string;
  date: string;
}

export interface WayDetails {
  id: number;
  way: string;
  wayNumber: string;
  whoArive: string;
  price: number;
  seatsAvailable: string;
  booking: string;
  from: Location;
  to: Location;
}

interface WayMenu {
  have?: boolean;
  date: string;
  from: string;
  to: string;
}

interface Store {
  saleTicket: {
    way: WayMenu;
    returnWay: WayMenu;
    activeWay: WayDetails | null;
    wayDetails: WayDetails[];

    setReturnWay: (data: WayMenu) => void;
    setWay: (data: WayMenu) => void;
    setWayDetails: (data: WayDetails[]) => void;
    setActiveWay: (way: WayDetails | null) => void;
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
    activeWay: null,
    wayDetails: [
      {
        id: 1,
        way: "Москва - Кемерово",
        wayNumber: "7345",
        whoArive: "ООО “Кузбасские междугородние перевозки”",
        price: 1276,
        seatsAvailable: "22",
        booking: "5",
        from: {
          city: "Москва",
          street: "ул.Ленина",
          house: "67",
          station: "ЖД Вокзал",
          time: "13:20",
          date: "2022-05-01",
        },
        to: {
          city: "Кемерово",
          street: "пр.Кузнецкий",
          house: "81",
          station: "",
          time: "17:50",
          date: "2022-05-01",
        },
      },
      {
        id: 2,
        way: "Новосибирск - Кемерово",
        wayNumber: "7345",
        whoArive: "ООО “Кузбасские междугородние перевозки”",
        price: 1276,
        seatsAvailable: "22",
        booking: "5",
        from: {
          city: "Новосибирск",
          street: "ул.Ленина",
          house: "67",
          station: "ЖД Вокзал",
          time: "13:20",
          date: "2022-05-01",
        },
        to: {
          city: "Кемерово",
          street: "пр.Кузнецкий",
          house: "81",
          station: "",
          time: "17:50",
          date: "2022-05-01",
        },
      },
    ],

    setReturnWay: (data: WayMenu) =>
      set((state) => ({ saleTicket: { ...state.saleTicket, returnWay: data } })),
    setWay: (data: WayMenu) => set((state) => ({ saleTicket: { ...state.saleTicket, way: data } })),
    setWayDetails: (data: WayDetails[]) =>
      set((state) => ({ saleTicket: { ...state.saleTicket, wayDetails: data } })),
    setActiveWay: (way: WayDetails | null) =>
      set((state) => ({ saleTicket: { ...state.saleTicket, activeWay: way } })),
  },
}));

export { useMainStore };
