/* eslint-disable @conarti/feature-sliced/layers-slices */
import { FC, ReactNode } from "react";
import { Passenger } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { Stacks, Typography } from "@/shared/ui";

interface Props {
  passenger: Passenger;
  direction: Direction;
  wayInfo?: ReactNode;
  passengerInfo?: ReactNode;
}

export const SeatPlace: FC<Props> = ({ passenger, direction, wayInfo, passengerInfo }) => {
  return (
    <>
      {direction === "there" && (
        <Stacks direction="column" gap={8}>
          <Stacks gap={8} fullwidth>
            <Typography variant="h3" weight={600}>
              Посадочное место:
            </Typography>
            <Typography variant="h3" weight={400}>
              {passenger.ticket.there?.seatId}
            </Typography>
          </Stacks>
          {passengerInfo}
        </Stacks>
      )}
      {direction === "return" && (
        <Stacks direction="column" gap={8}>
          <Typography variant="h3" color="primary-second" weight={600}>
            Обратный билет
          </Typography>
          {wayInfo}
          {passenger.ticket.return?.seatId && (
            <Stacks gap={8} fullwidth>
              <Typography variant="h3" weight={600}>
                Посадочное место:
              </Typography>
              <Typography variant="h3" weight={400}>
                {passenger.ticket.return?.seatId}
              </Typography>
            </Stacks>
          )}
          {passengerInfo}
        </Stacks>
      )}
    </>
  );
};
