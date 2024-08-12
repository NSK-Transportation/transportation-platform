import {
  Baggage,
  Discount,
  Document,
  Passenger,
  Payment,
  Seat,
  SeatStatus,
  Status,
  Ticket,
  WayDetails,
  WayMenu,
} from "@/app/@types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
interface Store {
  saleTicket: {
    // Состояния
    way: WayMenu;
    passengers: Passenger[];
    activeWay: WayDetails | null;
    wayDetails: {
      to: WayDetails[];
      return: WayDetails[];
    };
    statuses: Status[];
    tickets: Ticket[];
    discounts: Discount[];
    baggages: Baggage[];
    documents: Document[];
    payments: Payment[];

    // Методы для изменения состояния
    setWay: (data: WayMenu) => void;
    setPassenger: (passengerId: number, data: Partial<Passenger>) => void;
    setWayDetails: (data: WayDetails[], direction: "to" | "return") => void;
    setActiveWay: (way: WayDetails | null) => void;
    toggleSeatStatus: (
      direction: "to" | "return",
      wayId: number,
      seatId: number,
      maxSeats: number,
    ) => void;
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
          to: {
            date: "",
            from: "",
            to: "",
          },
        },
        passengers: [],
        activeWay: null,
        // wayDetails: [
        //   // {
        //   //   id: 1,
        //   //   way: "Москва - Кемерово",
        //   //   wayNumber: "7345",
        //   //   whoArive: "ООО “Кузбасские междугородние перевозки”",
        //   //   price: 1276,
        //   //   seatsSelected: [],
        //   //   seats: [
        //   //     { id: 1, status: "free" },
        //   //     { id: 2, status: "free" },
        //   //     { id: 3, status: "booking" },
        //   //     { id: 4, status: "occupied" },
        //   //     { id: 5, status: "free" },
        //   //     { id: 6, status: "free" },
        //   //     { id: 7, status: "free" },
        //   //     { id: 8, status: "free" },
        //   //     { id: 9, status: "free" },
        //   //     { id: 10, status: "free" },
        //   //     { id: 11, status: "free" },
        //   //     { id: 12, status: "free" },
        //   //     { id: 13, status: "free" },
        //   //   ],
        //   //   from: {
        //   //     city: "Москва",
        //   //     street: "ул.Ленина",
        //   //     house: "67",
        //   //     station: "ЖД Вокзал",
        //   //     time: "13:20",
        //   //     date: "2022-05-01",
        //   //   },
        //   //   to: {
        //   //     city: "Кемерово",
        //   //     street: "пр.Кузнецкий",
        //   //     house: "81",
        //   //     station: "",
        //   //     time: "17:50",
        //   //     date: "2022-05-01",
        //   //   },
        //   // },
        // ],
        wayDetails: {
          to: [],
          return: [],
        },
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
          { id: 1, type: "student", rus: "Студент (скидка 50%)" },
          { id: 2, type: "military", rus: "СВО (скидка 50%)" },
        ],
        baggages: [
          { id: 1, type: "none", rus: "Нет багажа" },
          { id: 2, type: "small", rus: "Маленький (20 кг)" },
          { id: 3, type: "big", rus: "Большой (40 кг)" },
          { id: 4, type: "huge", rus: "Огромный (60 кг)" },
        ],
        documents: [{ id: 1, type: "passport", rus: "Паспорт" }],
        payments: [
          { id: 1, type: "cash", rus: "Наличные" },
          { id: 2, type: "card", rus: "Карта" },
          { id: 3, type: "qr", rus: "QR Код" },
        ],

        setWay: (data) =>
          set((state) => {
            state.saleTicket.way = data;
          }),

        setWayDetails: (data: WayDetails[], direction: "to" | "return") =>
          set((state) => {
            state.saleTicket.wayDetails[direction] = data;
          }),

        setActiveWay: (way) =>
          set((state) => {
            state.saleTicket.activeWay = way;
          }),

        toggleSeatStatus: (direction: "to" | "return", wayId, seatId, maxSeats) =>
          set((state) => {
            const wayDetailsList = state.saleTicket.wayDetails[direction];
            const wayIndex = wayDetailsList?.findIndex((way: WayDetails) => way.id === wayId);
            if (wayIndex === -1) return;

            const selectedSeatsCount = wayDetailsList[wayIndex].seatsSelected.length;

            const seats = wayDetailsList[wayIndex].seats.map((seat: Seat) => {
              if (seat.id === seatId) {
                if (seat.status === "free" && selectedSeatsCount < maxSeats) {
                  wayDetailsList[wayIndex].seatsSelected.push(seatId);

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
                    payment: null,
                  });

                  return { ...seat, status: "selected" as SeatStatus };
                } else if (seat.status === "selected") {
                  wayDetailsList[wayIndex].seatsSelected = wayDetailsList[
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

            wayDetailsList[wayIndex].seats = seats;

            state.saleTicket.activeWay = {
              ...state.saleTicket.activeWay!,
              seats,
              seatsSelected: wayDetailsList[wayIndex].seatsSelected,
            };
          }),

        setPassenger: (passengerId, data) =>
          set((state) => {
            const passengerIndex = state.saleTicket.passengers.findIndex(
              (passenger) => passenger.id === passengerId,
            );
            if (passengerIndex !== -1) {
              state.saleTicket.passengers[passengerIndex] = {
                ...state.saleTicket.passengers[passengerIndex],
                ...data,
              };
            }
          }),
      },
    })),
  ),
);

export { useMainStore };
