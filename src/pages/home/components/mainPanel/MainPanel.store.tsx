import {
  Baggage,
  Discount,
  Document,
  Gender,
  Passenger,
  Payment,
  Privilege,
  Refund,
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
    activeWay: {
      to: WayDetails | null;
      return: WayDetails | null;
    };
    wayDetails: {
      to: WayDetails[];
      return: WayDetails[];
    };
    statuses: Status[];
    tickets: Ticket[];
    discounts: {
      discount: Discount[] | null;
      child: Discount[] | null;
    };
    baggages: Baggage[];
    documents: Document[];
    privileges: Privilege[];
    payments: Payment[];
    genders: Gender[];

    // Методы для изменения состояния
    setWay: (data: WayMenu) => void;
    setPassenger: (passengerId: number, data: Partial<Passenger>) => void;
    setWayDetails: (data: WayDetails[], direction: "to" | "return") => void;
    setActiveWay: (way: WayDetails | null, direction: "to" | "return") => void;
    toggleSeatStatus: (
      direction: "to" | "return",
      wayId: number,
      seatId: number,
      maxSeats: number,
    ) => void;
  };

  refundTicket: {
    passenger: Required<Passenger>;
    reasons: Refund[];
    setPassenger: (data: Partial<Passenger>) => void;
  };
}

const useMainStore = create<Store>()(
  devtools(
    immer((set) => ({
      saleTicket: {
        way: {
          remoteSale: false,
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
        activeWay: {
          to: null,
          return: null,
        },
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
        discounts: {
          child: [
            { id: 1, type: "half", value: 50, rus: "" },
            { id: 2, type: "full", value: 100, rus: "" },
          ],
          discount: [
            { id: 1, type: "student", value: 50, rus: "Студент" },
            { id: 2, type: "military", value: 50, rus: "СВО" },
          ],
        },
        baggages: [
          { id: 1, type: "none", rus: "Нет багажа" },
          { id: 2, type: "small", rus: "Маленький (20 кг)" },
          { id: 3, type: "big", rus: "Большой (40 кг)" },
          { id: 4, type: "huge", rus: "Огромный (60 кг)" },
        ],
        documents: [
          { id: 1, type: "passport", rus: "Паспорт" },
          { id: 2, type: "driver", rus: "Водительские" },
        ],
        privileges: [{ id: 1, type: "student", rus: "Студент" }],
        payments: [
          { id: 1, type: "cash", rus: "Наличные" },
          { id: 2, type: "card", rus: "Карта" },
          { id: 3, type: "qr", rus: "QR Код" },
        ],
        genders: [
          { id: 1, type: "male", rus: "Мужчина" },
          { id: 2, type: "female", rus: "Женщина" },
        ],

        setWay: (data) =>
          set((state) => {
            state.saleTicket.way = data;
          }),

        setWayDetails: (data: WayDetails[], direction: "to" | "return") =>
          set((state) => {
            state.saleTicket.wayDetails[direction] = data;
          }),

        setActiveWay: (way, direction) =>
          set((state) => {
            if (way) {
              state.saleTicket.activeWay[direction] = {
                ...way,
                seatsSelected: [],
                id: way.id ?? 0,
                wayNumber: way.wayNumber ?? "",
                from: way.from ?? {},
                to: way.to ?? {},
              };
            }
          }),

        toggleSeatStatus: (
          direction: "to" | "return",
          wayId: number,
          seatId: number,
          maxSeats: number,
        ) =>
          set((state) => {
            const wayDetailsList = state.saleTicket.wayDetails[direction];
            const wayIndex = wayDetailsList.findIndex((way) => way.id === wayId);
            if (wayIndex === -1) return;

            const wayDetails = wayDetailsList[wayIndex];

            const selectedSeatsCount = wayDetails.seatsSelected.length;

            const updatedSeats = wayDetails.seats.map((seat) => {
              if (seat.id === seatId) {
                if (seat.status === "free" && selectedSeatsCount < maxSeats) {
                  wayDetails.seatsSelected.push(seatId);

                  const newPassenger: Passenger = {
                    id: seatId,
                    firstName: "",
                    lastName: "",
                    patronymic: "",
                    gender: null,
                    birthday: "",
                    phone: "",
                    identification: null,
                    ticket: {
                      id: seatId,
                      seatId: seat.id,
                      wayDetails: wayDetails,
                    },
                    returnTicket: {
                      id: seatId,
                      seatId: seat.id,
                      wayDetails: wayDetails,
                    },
                  };

                  state.saleTicket.passengers.push(newPassenger);

                  return { ...seat, status: "selected" as SeatStatus };
                } else if (seat.status === "selected") {
                  wayDetails.seatsSelected = wayDetails.seatsSelected.filter((id) => id !== seatId);

                  state.saleTicket.passengers = state.saleTicket.passengers.filter(
                    (passenger) => passenger.ticket?.seatId !== seatId,
                  );

                  return { ...seat, status: "free" as SeatStatus };
                }
              }
              return seat;
            });

            wayDetails.seats = updatedSeats;

            state.saleTicket.wayDetails[direction] = [
              ...wayDetailsList.slice(0, wayIndex),
              { ...wayDetails, seats: updatedSeats, seatsSelected: wayDetails.seatsSelected },
              ...wayDetailsList.slice(wayIndex + 1),
            ];

            state.saleTicket.activeWay[direction] = {
              ...state.saleTicket.activeWay!,
              ...wayDetails,
              seats: updatedSeats,
              seatsSelected: wayDetails.seatsSelected,
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

      refundTicket: {
        passenger: {
          id: 0,
          firstName: "",
          lastName: "",
          patronymic: "",
          gender: null,
          birthday: "",
          phone: "",
          identification: null,
          ticket: {},
          returnTicket: {},
        },
        reasons: [{ id: 1, type: "delay", rus: "Опоздание" }],

        setPassenger: (data) =>
          set((state) => {
            state.refundTicket.passenger = { ...state.refundTicket.passenger, ...data };
          }),
      },
    })),
    { name: "MainPanelStore" },
  ),
);

export { useMainStore };
