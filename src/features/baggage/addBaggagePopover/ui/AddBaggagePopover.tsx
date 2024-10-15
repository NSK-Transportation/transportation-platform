import _ from "lodash";
import { FC, useState } from "react";
import { Baggage } from "@/entities/baggage";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { BaggageFillIcon } from "@/shared/assets";
import { Direction } from "@/shared/types";
import { Grid, Popover, Stacks, Typography } from "@/shared/ui";

interface Props {
  passenger: Passenger;
  baggage: Baggage;
  direction: Direction;
}

export const AddBaggagePopover: FC<Props> = ({ passenger, baggage, direction }) => {
  const { updatePassenger } = usePassengerStore();

  const baggageQuantity = passenger.ticket[direction]?.baggage?.quantity;

  const [selectedBaggage, setSelectedBaggage] = useState<boolean[]>(
    _.times(baggage.available, (index) => index < (baggageQuantity ?? 0)),
  );

  const handleClick = (index: number) => {
    const updatedSelectedBaggage = [...selectedBaggage];
    updatedSelectedBaggage[index] = !updatedSelectedBaggage[index];

    setSelectedBaggage(updatedSelectedBaggage);

    const selectedCount = updatedSelectedBaggage.filter(Boolean).length;

    updatePassenger(passenger.id, {
      ...passenger,
      ticket: {
        ...passenger.ticket,
        [direction]: {
          ...passenger.ticket[direction],
          baggage: {
            ...passenger.ticket[direction]?.baggage,
            quantity: selectedCount,
            price: baggage.price,
          },
        },
      },
    });
  };

  return (
    <Popover
      placement="bottom"
      trigger={
        <Typography variant="h3" color="primary" cursor="pointer">
          {baggageQuantity ? baggageQuantity + " Добавить багаж" : "+ Добавить багаж"}
        </Typography>
      }
    >
      <Stacks direction="column" gap={4}>
        <Stacks gap={4}>
          <Typography variant="h3">Доступно свободных мест:</Typography>
          <Typography variant="h3" color="info">
            {baggage.available}
          </Typography>
        </Stacks>
        <Stacks gap={4}>
          <Typography variant="h3">Тариф: </Typography>
          <Typography variant="h3" color="info">
            {baggage.price}
          </Typography>
        </Stacks>
        <Grid columns="repeat(6, 1fr)" gap={8}>
          {baggage.available &&
            _.times(baggage.available, (index) => (
              <BaggageFillIcon
                size={24}
                cursor="pointer"
                key={index}
                fill={selectedBaggage[index] ? "#FA742D" : "gray"}
                onClick={() => handleClick(index)}
              />
            ))}
        </Grid>
      </Stacks>
    </Popover>
  );
};
