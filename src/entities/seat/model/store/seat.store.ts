/* eslint-disable @conarti/feature-sliced/layers-slices */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { useWayDetailStore, WayDetail } from "@/entities/wayDetails";
import { Direction } from "@/shared/types";
import { getUniqueId } from "@/shared/utils";
import { Seat } from "../types/seat.types";

// Интерфейс хранилища
export interface Store {
  activeWay: {
    there: WayDetail | null;
    return: WayDetail | null;
  };
  toggleSeat: (direction: Direction, seatId: Seat["id"], maxSeats: number) => void;
}

export const useSeatStore = create<Store>()(
  devtools(
    immer((set) => ({
      activeWay: {
        there: useWayDetailStore.getState().activeWay.there,
        return: useWayDetailStore.getState().activeWay.return,
      },

      toggleSeat: (direction, seatId, maxSeats) =>
        set((state) => {
          const { wayDetail } = useWayDetailStore.getState();
          const passengers = usePassengerStore.getState().passengers;

          const passengersWithReturnTickets = passengers
            .map((passenger, index) => (passenger.ticket.return ? index : -1))
            .filter((index) => index !== -1);

          if (direction === "return" && passengersWithReturnTickets.length === 0) {
            console.log("Нет пассажиров с обратными билетами.");
            return;
          }

          const currentWay = wayDetail[direction]?.find(
            (wayDetail) => wayDetail.id === state.activeWay[direction]?.id,
          );
          if (!currentWay) return;

          const seatsCopy = currentWay.seats.map((seat) => ({ ...seat }));

          const seatToToggle = seatsCopy.find((seat) => seat.id === seatId);
          if (!seatToToggle) return;

          const selectedSeatsCount = seatsCopy.filter((seat) => seat.status === "selected").length;

          const isSeatFree = seatToToggle.status === "free";
          const isSeatSelected = seatToToggle.status === "selected";

          const passenger = passengers.find(
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
                  there: { wayDetail: state.activeWay[direction], seatId: seatId },
                  return: null,
                },
              };
              passengers.push(newPassenger);
            } else {
              passenger.ticket.there = { wayDetail: state.activeWay[direction], seatId: seatId };
            }

            seatToToggle.status = "selected";
          }

          if (direction === "return" && isSeatFree && selectedSeatsCount < maxSeats) {
            const passengerWithoutReturnSeat = passengers.find(
              (passenger) => !passenger.ticket.return?.seatId,
            );

            if (passengerWithoutReturnSeat) {
              passengerWithoutReturnSeat.ticket.return = {
                wayDetail: state.activeWay[direction],
                seatId: seatId,
              };

              seatToToggle.status = "selected";
            } else {
              console.log("Все пассажиры уже имеют обратные билеты.");
            }
          }

          if (direction === "there" && isSeatSelected) {
            passengers.filter((passenger) => passenger.ticket?.there?.seatId !== seatId);

            seatToToggle.status = "free";
          } else if (direction === "return" && isSeatSelected) {
            passengers.forEach((passenger) => {
              if (passenger.ticket.return?.seatId === seatId) {
                passenger.ticket.return = {
                  ...passenger.ticket.return,
                  seatId: null,
                };
              }
            });

            seatToToggle.status = "free";
          }

          state.activeWay[direction] = seatsCopy;
        }),
    })),
    {
      name: "SeatStore",
    },
  ),
);

useWayDetailStore.subscribe((state) => {
  useSeatStore.setState({
    activeWay: {
      there: state.activeWay.there,
      return: state.activeWay.return,
    },
  });
});
