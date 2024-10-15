import _ from "lodash";
import { FC, ReactNode, useLayoutEffect, useState } from "react";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { PassengerBaseFields } from "../PassengerBaseFields/PassengerBaseFields";
import { PassengerTicketFields } from "../PassengerTicketFields/PassengerTicketFields";

interface Props {
  passenger: Passenger;
  direction: Direction;
  addBaggage: ReactNode;
}

// TODO: Изменить проверку полей - добавить проверку у всех пассажиров, если их больше 1

export const PassengerFormField: FC<Props> = ({ passenger, direction, addBaggage }) => {
  const { updatePassenger, setFormFullfield } = usePassengerStore();

  const [isTicketFormComplete, setTicketFormComplete] = useState(false);
  const [isBaseFormComplete, setBaseFormComplete] = useState(false);

  useLayoutEffect(() => {
    if (isTicketFormComplete && isBaseFormComplete) {
      setFormFullfield(true);
    }
  }, [isTicketFormComplete, isBaseFormComplete, setFormFullfield]);

  const debouncedUpdatePassenger = _.debounce((updatedPassenger: Partial<Passenger>) => {
    updatePassenger(passenger.id, updatedPassenger);
  }, 300);

  const handleChangePassenger = (update: Partial<Passenger>) => {
    debouncedUpdatePassenger(update);
  };

  return (
    <>
      <PassengerTicketFields
        passenger={passenger}
        direction={direction}
        onChange={handleChangePassenger}
        setFormComplete={setTicketFormComplete}
        addBaggage={addBaggage}
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
