import { FC } from "react";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { PassengerBaseFields } from "../PassengerBaseFields/PassengerBaseFields";
import { PassengerTicketFields } from "../PassengerTicketFields/PassengerTicketFields";

interface Props {
  passenger: Passenger;
  direction: Direction;
}

export const PassengerFormField: FC<Props> = ({ passenger, direction }) => {
  const { updatePassenger } = usePassengerStore();

  const handleChangePassenger = (update: Partial<Passenger>) => {
    updatePassenger(passenger.id, update);
  };

  return (
    <>
      <PassengerTicketFields
        passenger={passenger}
        direction={direction}
        onChange={handleChangePassenger}
      />
      {!!passenger.ticket[direction]?.type && (
        <PassengerBaseFields
          passenger={passenger}
          direction={direction}
          onChange={handleChangePassenger}
        />
      )}
    </>
  );
};
