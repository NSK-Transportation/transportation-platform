import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { PassengerBaseFields } from "../PassengerBaseFields/PassengerBaseFields";
import { PassengerTicketFields } from "../PassengerTicketFields/PassengerTicketFields";

interface Props {
  passenger: Passenger;
  direction: Direction;
}

export const PassengerFormField: FC<Props> = ({ passenger, direction }) => {
  const { updatePassenger, setFormFullfield } = usePassengerStore();

  const [isTicketFormComplete, setTicketFormComplete] = useState(false);
  const [isBaseFormComplete, setBaseFormComplete] = useState(false);

  const debouncedUpdatePassenger = _.debounce((updatedPassenger: Partial<Passenger>) => {
    updatePassenger(passenger.id, updatedPassenger);
  }, 500);

  const handleChangePassenger = (update: Partial<Passenger>) => {
    debouncedUpdatePassenger(update);
  };

  useEffect(() => {
    if (isTicketFormComplete && isBaseFormComplete) {
      setFormFullfield(true);
    } else {
      setFormFullfield(false);
    }
  }, [isTicketFormComplete, isBaseFormComplete, setFormFullfield]);

  return (
    <>
      <PassengerTicketFields
        passenger={passenger}
        direction={direction}
        onChange={handleChangePassenger}
        setFormComplete={setTicketFormComplete}
      />
      {!!passenger.ticket[direction]?.type && (
        <PassengerBaseFields
          passenger={passenger}
          direction={direction}
          onChange={handleChangePassenger}
          setFormComplete={setBaseFormComplete}
        />
      )}
    </>
  );
};
