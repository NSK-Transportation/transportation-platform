import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Типы статусов мест
type SeatStatus = "free" | "selected" | "booking" | "occupied";

// Интерфейс мест
export interface Seat {
  id: number;
  status: SeatStatus;
}

// Интерфейс статусов
export interface StatusLabel {
  id: number;
  status: SeatStatus;
  rus: string;
}

// Интерфейс локации (откуда - куда)
export interface Location {
  city: string;
  street: string;
  house: string;
  station: string;
  time: string;
  date: string;
}

// Интерфейс детализации информации маршрута
export interface WayDetails {
  id: number;
  way: string;
  wayNumber: string;
  whoArive: string;
  price: number;
  seatsAvailable: string;
  seats: Seat[];
  booking: string;
  from: Location;
  to: Location;
}

// Интерфейс информации маршрута
interface WayMenu {
  returnHave?: boolean;
  return: {
    date: string;
    from: string;
    to: string;
  };
  date: string;
  from: string;
  to: string;
}

// Интерфейс хранилища
interface Store {
  saleTicket: {
    // Состояния
    way: WayMenu;
    activeWay: WayDetails | null;
    wayDetails: WayDetails[];
    statuses: StatusLabel[];

    // Методы для изменения состояния
    setWay: (data: WayMenu) => void;
    setWayDetails: (data: WayDetails[]) => void;
    setActiveWay: (way: WayDetails | null) => void;
    toggleSeatStatus: (wayId: number, seatId: number, maxSeats: number) => void;
  };
}

const useMainStore = create<Store>()(
  devtools(
    immer((set) => ({
      saleTicket: {
        way: {
          returnHave: false,
          return: {
            date: "",
            from: "",
            to: "",
          },
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
            seatsAvailable: "13",
            seats: [
              { id: 1, status: "free" },
              { id: 2, status: "selected" },
              { id: 3, status: "booking" },
              { id: 4, status: "occupied" },
              { id: 5, status: "free" },
              { id: 6, status: "free" },
              { id: 7, status: "free" },
              { id: 8, status: "free" },
              { id: 9, status: "free" },
              { id: 10, status: "free" },
              { id: 11, status: "free" },
              { id: 12, status: "free" },
              { id: 13, status: "free" },
            ],
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
            way: "Москва - Кемерово",
            wayNumber: "7345",
            whoArive: "ООО “Кузбасские междугородние перевозки”",
            price: 1276,
            seatsAvailable: "13",
            seats: [
              { id: 1, status: "free" },
              { id: 2, status: "selected" },
              { id: 3, status: "booking" },
              { id: 4, status: "occupied" },
              { id: 5, status: "free" },
              { id: 6, status: "free" },
              { id: 11, status: "free" },
              { id: 12, status: "free" },
              { id: 13, status: "free" },
            ],
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
        ],
        statuses: [
          { id: 1, status: "free", rus: "Свободно" },
          { id: 2, status: "selected", rus: "Выбрано" },
          { id: 3, status: "booking", rus: "Есть бронь" },
          { id: 4, status: "occupied", rus: "Занято" },
        ],

        setWay: (data: WayMenu) =>
          set((state) => {
            state.saleTicket.way = data;
          }),
        setWayDetails: (data: WayDetails[]) =>
          set((state) => {
            state.saleTicket.wayDetails = data;
          }),
        setActiveWay: (way: WayDetails | null) =>
          set((state) => {
            state.saleTicket.activeWay = way;
          }),
        toggleSeatStatus: (wayId: number, seatId: number, maxSeats: number) =>
          set((state) => {
            const wayIndex = state.saleTicket.wayDetails.findIndex(
              (way: WayDetails) => way.id === wayId,
            );
            if (wayIndex === -1) return;

            const selectedSeatsCount = state.saleTicket.wayDetails[wayIndex].seats.filter(
              (seat: Seat) => seat.status === "selected",
            ).length;

            state.saleTicket.wayDetails[wayIndex].seats = state.saleTicket.wayDetails[
              wayIndex
            ].seats.map((seat: Seat) =>
              seat.id === seatId
                ? {
                    ...seat,
                    status:
                      seat.status === "free"
                        ? selectedSeatsCount < maxSeats
                          ? "selected"
                          : "free"
                        : "free",
                  }
                : seat,
            );

            state.saleTicket.activeWay = {
              ...state.saleTicket.activeWay!,
              seats: state.saleTicket.wayDetails.find((way: WayDetails) => way.id === wayId)!.seats,
            };
          }),
      },
    })),
  ),
);

export { useMainStore };
