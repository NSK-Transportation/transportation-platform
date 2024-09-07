import {
  Baggage,
  BaggageType,
  Direction,
  Discount,
  DiscountType,
  Document,
  DocumentType,
  Gender,
  GenderType,
  Passenger,
  Payment,
  PaymentType,
  Privilege,
  PrivilegeType,
  SeatStatus,
  Status,
  Ticket,
  TicketType,
  WayDetails,
  WayMenu,
} from "@/app/@types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Интерфейс хранилища
export interface Store {
  // Состояния
  way: WayMenu;
  passengers: Passenger[];
  activeWay: {
    there: WayDetails | null;
    return: WayDetails | null;
  };
  wayDetails: {
    there: WayDetails[];
    return: WayDetails[];
  };
  statuses: Status[];
  tickets: Partial<Ticket>[];
  discount: {
    main: Discount[];
    child: Discount[];
  };
  baggages: Baggage[];
  documents: Document[];
  privileges: Privilege[];
  payments: Payment[];
  genders: Gender[];

  // Методы для изменения состояния
  setWay: (way: WayMenu) => void;
  setPassenger: (
    seatId: number,
    direction: Direction,
    activeWay: WayDetails | null,
    data?: Partial<Passenger>,
  ) => void;
  setWayDetails: (wayDetails: WayDetails[], direction: Direction) => void;
  setActiveWay: (activeWay: WayDetails | null, direction: Direction) => void;
  toggleSeatStatus: (
    direction: Direction,
    activeWay: WayDetails | null,
    seatId: number,
    maxSeats: number,
  ) => void;
}

export const useSaleTicket = create<Store>()(
  devtools(
    immer((set) => ({
      way: {
        remoteSale: false,
        returnHave: false,
        return: {
          date: "",
          from: "",
          to: "",
        },
        there: {
          date: "21.12.2024",
          from: "12",
          to: "12",
        },
      },
      passengers: [],
      activeWay: {
        there: null,
        return: null,
      },
      wayDetails: {
        there: [],
        return: [],
      },
      statuses: [
        { id: 1, status: "free", rus: "Свободно" },
        { id: 2, status: "selected", rus: "Выбрано" },
        { id: 3, status: "booking", rus: "Есть бронь" },
        { id: 4, status: "occupied", rus: "Занято" },
      ],
      tickets: [
        { id: 1, type: TicketType.FULL, rus: "Полный билет" },
        { id: 2, type: TicketType.CHILD, rus: "Детский билет" },
        { id: 3, type: TicketType.PRIVILEGE, rus: "Льготный билет" },
        { id: 4, type: TicketType.DISCOUNT, rus: "Скидочный билет" },
      ],
      discount: {
        main: [
          { id: 1, type: DiscountType.STUDENT, value: 50, rus: "Студент" },
          { id: 2, type: DiscountType.MILITARY, value: 50, rus: "СВО" },
        ],
        child: [
          { id: 1, type: DiscountType.HALF, value: 50, rus: "" },
          { id: 2, type: DiscountType.FULL, value: 100, rus: "" },
        ],
      },
      baggages: [
        { id: 1, type: BaggageType.NONE, rus: "Нет багажа" },
        { id: 2, type: BaggageType.SMALL, rus: "Маленький (20 кг)" },
        { id: 3, type: BaggageType.BIG, rus: "Большой (40 кг)" },
        { id: 4, type: BaggageType.HUGE, rus: "Огромный (60 кг)" },
      ],
      documents: [
        { id: 1, type: DocumentType.PASSPORT, rus: "Паспорт" },
        { id: 2, type: DocumentType.DRIVER, rus: "Водительские" },
      ],
      privileges: [{ id: 1, type: PrivilegeType.STUDENT, rus: "Студент" }],
      payments: [
        { id: 1, type: PaymentType.CASH, rus: "Наличные" },
        { id: 2, type: PaymentType.CARD, rus: "Карта" },
        { id: 3, type: PaymentType.QRCODE, rus: "QR Код" },
      ],
      genders: [
        { id: 1, type: GenderType.MALE, rus: "Мужчина" },
        { id: 2, type: GenderType.FEMALE, rus: "Женщина" },
      ],

      setWay: (way) =>
        set((state) => {
          state.way = way;
        }),

      setWayDetails: (wayDetails, direction) =>
        set((state) => {
          state.wayDetails[direction] = wayDetails;
        }),

      setActiveWay: (activeWay, direction) =>
        set((state) => {
          state.activeWay[direction] = activeWay;
        }),

      toggleSeatStatus: (direction, activeWay, seatId, maxSeats) =>
        set((state) => {
          const wayDetailsList = state.wayDetails[direction];
          const wayIndex = wayDetailsList.findIndex((way) => way.id === activeWay?.id);
          if (wayIndex === -1) return;

          const wayDetails = wayDetailsList[wayIndex];

          const updatedSeats = wayDetails.seats.map((seat) => {
            if (seat.id === seatId) {
              if (seat.status === "free" && wayDetails.seatsSelected.length < maxSeats) {
                wayDetails.seatsSelected.push(seatId);
                return { ...seat, status: "selected" as SeatStatus };
              } else if (seat.status === "selected") {
                wayDetails.seatsSelected = wayDetails.seatsSelected.filter((id) => id !== seatId);

                state.passengers = state.passengers.map((passenger) => {
                  if (passenger.ticket[direction]?.seatId === seatId) {
                    passenger.ticket[direction] = null;
                  }
                  return passenger;
                });

                state.passengers = state.passengers.filter(
                  (passenger) => passenger.ticket.there || passenger.ticket.return,
                );

                return { ...seat, status: "free" as SeatStatus };
              }
            }
            return seat;
          });

          wayDetails.seats = updatedSeats;

          state.wayDetails[direction] = [
            ...wayDetailsList.slice(0, wayIndex),
            { ...wayDetails, seats: updatedSeats, seatsSelected: wayDetails.seatsSelected },
            ...wayDetailsList.slice(wayIndex + 1),
          ];

          state.activeWay[direction] = {
            ...wayDetails,
            seats: updatedSeats,
            seatsSelected: wayDetails.seatsSelected,
          };
        }),

      setPassenger: (seatId, direction, activeWay, data) =>
        set((state) => {
          const existingPassenger = state.passengers.find(
            (passenger) => passenger.ticket[direction]?.seatId === seatId,
          );

          if (existingPassenger) {
            const updatedPassenger = {
              ...existingPassenger,
              ...data,
              ticket: {
                ...existingPassenger.ticket,
                [direction]: {
                  ...existingPassenger.ticket[direction],
                  ...data?.ticket?.[direction],
                },
              },
            };

            if (!updatedPassenger.ticket.there && !updatedPassenger.ticket.return) {
              state.passengers = state.passengers.filter(
                (passenger) => passenger.id !== existingPassenger.id,
              );
            } else {
              state.passengers = state.passengers.map((passenger) =>
                passenger.id === existingPassenger.id ? updatedPassenger : passenger,
              );
            }
          } else {
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
                there: direction === "there" ? { id: seatId, seatId, wayDetails: activeWay } : null,
                return:
                  direction === "return" ? { id: seatId, seatId, wayDetails: activeWay } : null,
              },
            };

            state.passengers.push(newPassenger);
          }
        }),
    })),
    {
      name: "SaleTicketStore",
    },
  ),
);
