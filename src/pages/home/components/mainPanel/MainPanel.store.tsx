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
  seatsSelected: number[];
  seats: Seat[];
  from: Location;
  to: Location;
}

// Типы билетов
type TicketType = "full" | "child" | "privilege" | "discount";
export type DocumentType = "passport";

export enum DiscountType {
  none = 0,
  student = 50,
  military = 50,
  half = 50,
  full = 100,
}

export enum BaggageType {
  none = 0,
  small = 20,
  big = 40,
  huge = 60,
}

// Интерфейс скидок
export interface Discount {
  id: number;
  type: DiscountType;
  rus: string;
}

// Интерфейс билета
export interface Ticket {
  id: number;
  type: TicketType;
  rus: string;
}

export interface Baggage {
  id: number;
  type: BaggageType;
  rus: string;
}

export interface Document {
  id: number;
  type: DocumentType;
  rus: string;
}

export interface Identification {
  series?: string;
  number?: string;
  documentType?: DocumentType;
}

// Интерфейс пассажира
export interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: "women" | "men" | null;
  birthday: string;
  phone: string;
  seatId: number;
  identification: Identification | null;
  ticket: Ticket | null;
  baggage: Baggage | null;
  discount: Discount | null;
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
    passengers: Passenger[];
    activeWay: WayDetails | null;
    wayDetails: WayDetails[];
    statuses: StatusLabel[];
    tickets: Ticket[];
    discounts: Discount[];
    baggages: Baggage[];
    documents: Document[];

    // Методы для изменения состояния
    setWay: (data: WayMenu) => void;
    setPassenger: (passengerId: number, updatedData: Partial<Passenger>) => void;
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
        passengers: [],
        activeWay: null,
        wayDetails: [
          {
            id: 1,
            way: "Москва - Кемерово",
            wayNumber: "7345",
            whoArive: "ООО “Кузбасские междугородние перевозки”",
            price: 1276,
            seatsSelected: [],
            seats: [
              { id: 1, status: "free" },
              { id: 2, status: "free" },
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
        tickets: [
          { id: 1, type: "full", rus: "Полный билет" },
          { id: 2, type: "child", rus: "Детский билет" },
          { id: 3, type: "privilege", rus: "Льготный билет" },
          { id: 4, type: "discount", rus: "Скидочный билет" },
        ],
        discounts: [
          { id: 1, type: DiscountType.student, rus: "Студент (скидка 50%)" },
          { id: 2, type: DiscountType.military, rus: "СВО (скидка 50%)" },
        ],
        baggages: [
          { id: 1, type: BaggageType.none, rus: "Нет багажа" },
          { id: 2, type: BaggageType.small, rus: "Маленький (20 кг)" },
          { id: 3, type: BaggageType.big, rus: "Большой (40 кг)" },
          { id: 4, type: BaggageType.huge, rus: "Огромный (60 кг)" },
        ],
        documents: [{ id: 1, type: "passport", rus: "Паспорт" }],

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

            const selectedSeatsCount = state.saleTicket.wayDetails[wayIndex].seatsSelected.length;

            const seats = state.saleTicket.wayDetails[wayIndex].seats.map((seat: Seat) => {
              if (seat.id === seatId) {
                if (seat.status === "free" && selectedSeatsCount < maxSeats) {
                  state.saleTicket.wayDetails[wayIndex].seatsSelected.push(seatId);

                  state.saleTicket.passengers.push({
                    id: seatId,
                    discount: null,
                    firstName: "",
                    lastName: "",
                    patronymic: "",
                    gender: null,
                    birthday: "",
                    phone: "",
                    seatId: seatId,
                    identification: null,
                    baggage: null,
                    ticket: null,
                  });

                  return { ...seat, status: "selected" as SeatStatus };
                } else if (seat.status === "selected") {
                  state.saleTicket.wayDetails[wayIndex].seatsSelected = state.saleTicket.wayDetails[
                    wayIndex
                  ].seatsSelected.filter((id) => id !== seatId);

                  state.saleTicket.passengers = state.saleTicket.passengers.filter(
                    (passenger) => passenger.seatId !== seatId,
                  );

                  return { ...seat, status: "free" as SeatStatus };
                }
              }
              return seat;
            });

            state.saleTicket.wayDetails[wayIndex].seats = seats;

            state.saleTicket.activeWay = {
              ...state.saleTicket.activeWay!,
              seats,
              seatsSelected: state.saleTicket.wayDetails[wayIndex].seatsSelected,
            };
          }),

        setPassenger: (passengerId: number, updatedData: Partial<Passenger>) =>
          set((state) => {
            const passengerIndex = state.saleTicket.passengers.findIndex(
              (passenger) => passenger.id === passengerId,
            );
            if (passengerIndex !== -1) {
              state.saleTicket.passengers[passengerIndex] = {
                ...state.saleTicket.passengers[passengerIndex],
                ...updatedData,
              };
            }
          }),
      },
    })),
  ),
);

export { useMainStore };
