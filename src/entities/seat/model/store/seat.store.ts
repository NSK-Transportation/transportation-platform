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
  toggleSeat: (
    direction: Direction,
    activeWay: WayDetail,
    seatId: Seat["id"],
    maxSeats: number,
  ) => void;
}

export const useSeatStore = create<Store>()(
  devtools(
    immer((set) => ({
      toggleSeat: (direction, activeWay, seatId, maxSeats) =>
        set(() => {
          const { wayDetails, updateActiveWay } = useWayDetailStore.getState();
          const { passengers, setPassengers, clearPassenger, updatePassenger } =
            usePassengerStore.getState();

          const passengersWithReturnTickets = passengers
            .map((passenger, index) => (passenger.ticket.return ? index : -1))
            .filter((index) => index !== -1);

          if (direction === "return" && passengersWithReturnTickets.length === 0) {
            console.log("Нет пассажиров с обратными билетами.");
            return;
          }

          const currentWay = wayDetails[direction]?.find(
            (wayDetail) => wayDetail.id === activeWay?.id,
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
                birthday: null,
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

              setPassengers(newPassenger);
            } else {
              passenger.ticket.there = { wayDetail: activeWay, seatId: seatId };
            }

            seatToToggle.status = "selected";
          }

          if (direction === "return" && isSeatFree && selectedSeatsCount < maxSeats) {
            const passengerWithoutReturnSeat = passengers.find(
              (passenger) => !passenger.ticket.return?.seatId,
            );

            if (passengerWithoutReturnSeat) {
              updatePassenger(passengerWithoutReturnSeat.id, {
                ticket: {
                  ...passengerWithoutReturnSeat.ticket,
                  return: { wayDetail: activeWay, seatId: seatId },
                },
              });

              seatToToggle.status = "selected";
            } else {
              console.log("Все пассажиры уже имеют обратные билеты.");
            }
          }

          if (direction === "there" && isSeatSelected) {
            passengers.forEach((passenger) => {
              if (passenger.ticket.there?.seatId === seatId) {
                clearPassenger(passenger.id);
              }
            });

            seatToToggle.status = "free";
          } else if (direction === "return" && isSeatSelected) {
            passengers.forEach((passenger) => {
              if (passenger.ticket.return?.seatId === seatId) {
                updatePassenger(passenger.id, {
                  ticket: {
                    ...passenger.ticket,
                    return: { wayDetail: activeWay, seatId: null },
                  },
                });
              }
            });

            seatToToggle.status = "free";
          }

          updateActiveWay(activeWay.id, direction, { seats: seatsCopy });
        }),
    })),
    {
      name: "SeatStore",
    },
  ),
);
