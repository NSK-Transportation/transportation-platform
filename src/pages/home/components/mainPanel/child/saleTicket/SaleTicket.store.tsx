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
  Seat,
  Status,
  Ticket,
  TicketType,
  WayDetails,
  WayMenu,
} from "@/app/@types";
import { getUniqueId } from "@/shared/utils";
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
    passengerId: Passenger["id"],
    direction: Direction,
    activeWay: WayDetails | null,
    data?: Partial<Passenger>,
  ) => void;
  setWayDetails: (wayDetails: WayDetails[], direction: Direction) => void;
  setActiveWay: (activeWay: WayDetails | null, direction: Direction) => void;
  toggleSeat: (
    direction: Direction,
    activeWay: WayDetails | null,
    seatId: Seat["id"],
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
          date: "21.12.2024",
          from: "1",
          to: "1",
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
          { id: 1, type: DiscountType.HALF, value: 50, rus: "скидка" },
          { id: 2, type: DiscountType.FULL, value: 100, rus: "скидка" },
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
      privileges: [
        { id: 1, type: PrivilegeType.STUDENT, rus: "Студент" },
        { id: 2, type: PrivilegeType.MILITARY, rus: "СВО" },
      ],
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

      toggleSeat: (direction, activeWay, seatId, maxSeats) =>
        set((state) => {
          if (!activeWay) return;

          const passengersWithReturnTickets = state.passengers
            .map((passenger, index) => (passenger.ticket.return ? index : -1))
            .filter((index) => index !== -1);

          if (direction === "return" && passengersWithReturnTickets.length === 0) {
            console.log("Нет пассажиров с обратными билетами.");
            return;
          }

          const currentWay = state.wayDetails[direction]?.find(
            (wayDetail) => wayDetail.id === activeWay?.id,
          );
          if (!currentWay) return;

          const seatToToggle = currentWay.seats.find((seat) => seat.id === seatId);
          if (!seatToToggle) return;

          const selectedSeatsCount = currentWay.seats.filter(
            (seat) => seat.status === "selected",
          ).length;

          const isSeatFree = seatToToggle.status === "free";
          const isSeatSelected = seatToToggle.status === "selected";

          const passenger = state.passengers.find(
            (passenger) => passenger.ticket[direction]?.seatId === seatId,
          );

          if (direction === "there" && isSeatFree && selectedSeatsCount < maxSeats) {
            if (!passenger) {
              const newPassenger: Passenger = {
                id: getUniqueId(),
                firstName: "",
                lastName: "",
                patronymic: "",
                gender: null,
                birthday: "",
                phone: "",
                identification: null,
                ticket: {
                  there: { wayDetails: activeWay, seatId: seatId },
                  return: null,
                },
              };
              state.passengers.push(newPassenger);
            } else {
              passenger.ticket.there = { wayDetails: activeWay, seatId: seatId };
            }

            seatToToggle.status = "selected";
          }

          if (direction === "return" && isSeatFree && selectedSeatsCount < maxSeats) {
            const passengerWithoutReturnSeat = state.passengers.find(
              (passenger) => !passenger.ticket.return?.seatId,
            );

            if (passengerWithoutReturnSeat) {
              passengerWithoutReturnSeat.ticket.return = {
                wayDetails: activeWay,
                seatId: seatId,
              };

              seatToToggle.status = "selected";
            } else {
              console.log("Все пассажиры уже имеют обратные билеты.");
            }
          }

          if (direction === "there" && isSeatSelected) {
            state.passengers = state.passengers.filter(
              (passenger) => passenger.ticket?.there?.seatId !== seatId,
            );
            
            seatToToggle.status = "free";
          } else if (direction === "return" && isSeatSelected) {
            state.passengers.forEach((passenger) => {
              if (passenger.ticket.return?.seatId === seatId) {
                passenger.ticket.return = {
                  ...passenger.ticket.return,
                  seatId: null,
                };
              }
            });

            seatToToggle.status = "free";
          }

          state.activeWay[direction] = { ...currentWay };
        }),

      setPassenger: (passengerId, direction, activeWay, data) =>
        set((state) => {
          const existingPassenger = state.passengers.find(
            (passenger) => passenger.id === passengerId,
          );

          if (!existingPassenger) return;

          const currentTicket = existingPassenger.ticket[direction] || {};

          const updatedTicket = {
            ...existingPassenger.ticket,
            [direction]: {
              wayDetails: activeWay || currentTicket.wayDetails,
              seatId: data?.ticket?.[direction]?.seatId || null,
            },
          };

          if (!updatedTicket.there?.seatId && !updatedTicket.return?.seatId) {
            state.passengers = state.passengers.filter((passenger) => passenger.id !== passengerId);
          } else {
            existingPassenger.ticket = updatedTicket;
            Object.assign(existingPassenger, data);
          }
        }),
    })),
    {
      name: "SaleTicketStore",
    },
  ),
);
