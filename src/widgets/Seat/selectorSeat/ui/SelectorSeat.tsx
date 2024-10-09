import { FC } from "react";
import { usePassengerStore } from "@/entities/passenger";
import { Seat, useSeatStore } from "@/entities/seat";
import { useWayDetailStore } from "@/entities/wayDetails";
import { Direction } from "@/shared/types";
import { Box, Button, Stacks, Typography } from "@/shared/ui";

interface Props {
  direction: Direction;
}

export const SelectorSeat: FC<Props> = ({ direction }) => {
  const { toggleSeat } = useSeatStore();
  const { activeWay } = useWayDetailStore();
  const { passengers } = usePassengerStore();

  const countWithReturnTrip = passengers.filter((passenger) => passenger.ticket.return).length;
  const maxSeatsAvailable =
    countWithReturnTrip && direction === "return" ? countWithReturnTrip : 10;

  const handleSeatClick = (seat: Seat) => {
    if (activeWay?.[direction]) {
      toggleSeat(direction, activeWay[direction], seat.id, maxSeatsAvailable);
    }
  };

  const seatsSelected = activeWay[direction]?.seats.filter(
    (seat) => seat.status === "selected",
  ).length;

  return (
    <Box>
      <Stacks fullwidth direction="column" gap={16}>
        <Stacks justifyContent="space-between">
          <Stacks direction="column" gap={4}>
            <Typography variant="h3">Количество мест: {seatsSelected}</Typography>
            <Typography color="secondary" variant="h4">
              Макс. количество: {maxSeatsAvailable}
            </Typography>
          </Stacks>

          <Stacks alignItems="flex-end" direction="column" gap={4}>
            <Typography variant="h3">
              Автобус: {activeWay[direction]?.vehicle.licensePlate}
            </Typography>
            <Typography variant="h3">
              Пассажирских мест: {activeWay[direction]?.seats.length}
            </Typography>
            <Typography variant="h3">
              Багажных мест: {activeWay[direction]?.baggage.available}
            </Typography>
          </Stacks>
        </Stacks>

        <Stacks alignItems="center" direction="column" gap={8}>
          <Box variant="dashed">
            <Stacks
              fullwidth
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
              gap={16}
            >
              {activeWay?.[direction]?.seats.map((seat) => (
                <Button
                  key={seat.id}
                  variant={seat.status}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.status === "booking" || seat.status === "occupied"}
                  label={`Место ${seat.id}`}
                />
              ))}
            </Stacks>
          </Box>
        </Stacks>

        <Typography variant="h3" color="secondary">
          Представленная нумерация мест не является схемой. Расположение выбранного номера места
          зависит от марки автобуса. Тип транспортного средства может быть изменён по инициативе
          перевозчика.
        </Typography>
      </Stacks>
    </Box>
  );
};
