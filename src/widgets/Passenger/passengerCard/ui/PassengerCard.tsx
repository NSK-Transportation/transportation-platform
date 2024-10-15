import { FC } from "react";
import { AddBaggagePopover } from "@/features/baggage";
import { PassengerFormField } from "@/features/passenger";
import { useBaggageStore } from "@/entities/baggage";
import { usePassengerStore } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { Box, Chip, Grid, Stacks, Typography } from "@/shared/ui";

interface Props {
  direction: Direction;
}

export const PassengerCard: FC<Props> = ({ direction }) => {
  const { passengers } = usePassengerStore();
  const { baggage } = useBaggageStore();

  return (
    <>
      {passengers
        .filter((passenger) => {
          if (direction === "there") {
            return true;
          }
          if (direction === "return") {
            return passenger.ticket.return !== null;
          }
          return false;
        })
        .map((passenger) => (
          <Box key={passenger.id}>
            <Stacks direction="column" gap={16}>
              <Stacks gap={8}>
                <Typography variant="h3">Данные пассажира </Typography>
                <Chip
                  variant="primary"
                  size="small"
                  label={`Место ${passenger.ticket[direction]?.seatId}`}
                />
              </Stacks>

              <Grid gap={16}>
                <Grid columns="repeat(2, 1fr)" gap={16}>
                  <PassengerFormField
                    direction={direction}
                    passenger={passenger}
                    addBaggage={
                      <AddBaggagePopover
                        baggage={baggage}
                        passenger={passenger}
                        direction={direction}
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Typography variant="h4" color="secondary">
                * - обязательно к заполнению
              </Typography>
            </Stacks>
          </Box>
        ))}
    </>
  );
};
