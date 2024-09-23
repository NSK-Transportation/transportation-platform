import {
  City,
  Country,
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
  WayDetail,
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
    there: WayDetail | null;
    return: WayDetail | null;
  };
  wayDetail: {
    there: WayDetail[];
    return: WayDetail[];
  };
  options: {
    statuses: Status[];
    tickets: Partial<Ticket>[];
    discounts: {
      main: Discount[];
      child: Discount[];
    };
    documents: Document[];
    privileges: Privilege[];
    payments: Payment[];
    genders: Gender[];
    countries: Country[];
    cities: City[];
  };

  // Методы для изменения состояния
  setWay: (way: WayMenu) => void;
  setPassenger: (
    passengerId: Passenger["id"],
    direction: Direction,
    activeWay: WayDetail | null,
    data?: Partial<Passenger>,
  ) => void;
  setWayDetail: (wayDetail: WayDetail[] | null, direction: Direction) => void;
  setActiveWay: (activeWay: WayDetail | null, direction: Direction) => void;
  toggleSeat: (
    direction: Direction,
    activeWay: WayDetail | null,
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
          date: "",
          from: {
            city: "",
            station: "",
          },
          to: {
            city: "",
            station: "",
          },
        },
        there: {
          date: "",
          from: {
            city: "",
            station: "",
          },
          to: {
            city: "",
            station: "",
          },
        },
      },
      passengers: [],
      activeWay: {
        there: null,
        return: null,
      },
      wayDetail: {
        there: [],
        return: [],
      },
      options: {
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
        discounts: {
          main: [],
          child: [
            { id: 1, type: DiscountType.HALF, value: 50, rus: "скидка" },
            { id: 2, type: DiscountType.FULL, value: 100, rus: "скидка" },
          ],
        },
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
          { id: 3, type: PaymentType.SBP, rus: "QR Код" },
        ],
        genders: [
          { id: 1, type: GenderType.MALE, rus: "Мужчина" },
          { id: 2, type: GenderType.FEMALE, rus: "Женщина" },
        ],
        countries: [
          {
            id: 1,
            name: "Russia",
            rus: "Россия",
            code: "RU",
            dialCode: "+7",
            flag: "https://flagcdn.com/w320/ru.png",
          },
          {
            id: 2,
            name: "United States",
            rus: "США",
            code: "US",
            dialCode: "+1",
            flag: "https://flagcdn.com/w320/us.png",
          },
          {
            id: 3,
            name: "Germany",
            rus: "Германия",
            code: "DE",
            dialCode: "+49",
            flag: "https://flagcdn.com/w320/de.png",
          },
        ],
        cities: [
          {
            id: 1,
            name: "Novosibirsk",
            rus: "Новосибирск",
            stations: [
              {
                id: 1,
                name: "AB Main",
                rus: "АВ Главный",
              },
              {
                id: 2,
                name: "Railway",
                rus: "Железнодорожный",
              },
            ],
          },
          {
            id: 2,
            name: "Krasnoyarsk",
            rus: "Красноярск",
            stations: [
              {
                id: 1,
                name: "AB Krasnoyarsk",
                rus: "АВ Красноярск",
              },
            ],
          },
        ],
      },

      setWay: (way) =>
        set((state) => {
          state.way = way;
        }),

      setWayDetail: (wayDetail, direction) =>
        set((state) => {
          state.wayDetail[direction] = wayDetail || [];
        }),

      setActiveWay: (activeWay, direction) =>
        set((state) => {
          state.activeWay[direction] = activeWay;
          state.options.discounts.main = activeWay?.discounts || [];
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

          const currentWay = state.wayDetail[direction]?.find(
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
                phone: {
                  code: "+7",
                  number: "",
                  refusalToProvide: false,
                },
                identification: null,
                ticket: {
                  there: { wayDetail: activeWay, seatId: seatId },
                  return: null,
                },
              };
              state.passengers.push(newPassenger);
            } else {
              passenger.ticket.there = { wayDetail: activeWay, seatId: seatId };
            }

            seatToToggle.status = "selected";
          }

          if (direction === "return" && isSeatFree && selectedSeatsCount < maxSeats) {
            const passengerWithoutReturnSeat = state.passengers.find(
              (passenger) => !passenger.ticket.return?.seatId,
            );

            if (passengerWithoutReturnSeat) {
              passengerWithoutReturnSeat.ticket.return = {
                wayDetail: activeWay,
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
              wayDetail: activeWay || currentTicket.wayDetail,
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
