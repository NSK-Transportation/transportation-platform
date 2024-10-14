/* eslint-disable @conarti/feature-sliced/layers-slices */
import { FC, ReactNode } from "react";
import { Passenger } from "@/entities/passenger";
import { Box, Divider, Grid, Stacks, Tooltip, Typography } from "@/shared/ui";
import { Payment } from "../../../model/types/payment.types";

interface Props {
  actions: ReactNode;
  payment: Payment;
  passengers: Passenger[];
}

export const PaymentInformation: FC<Props> = ({ actions, payment, passengers }) => {
  const renderPriceDetail = (name: string, payment: Payment, type: "ticket" | "baggage") => (
    <Typography variant="h5">
      {name}:{" "}
      <Tooltip
        text={
          <>
            <Typography variant="h5" color="secondary">
              Туда: {payment[type]?.there?.price} руб
            </Typography>
            {!payment[type]?.return && (
              <Typography variant="h5" color="secondary">
                Обратно: {payment[type]?.return?.price} руб
              </Typography>
            )}
          </>
        }
      >
        <Typography variant="h5" color="info" line="underline">
          {payment[type]?.amount} руб.
        </Typography>
      </Tooltip>
    </Typography>
  );

  const passengerTicket = renderPriceDetail("Пассажирский билет", payment, "ticket");
  const baggageTicket = renderPriceDetail("Багажный билет", payment, "baggage");

  const passengersHasBaggage = passengers.some(
    (passenger) =>
      passenger.ticket.there?.baggage?.quantity || passenger.ticket.return?.baggage?.quantity,
  );

  return (
    <Box>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography variant="h3">Оплата</Typography>

        <Stacks gap={32} justifyContent="center">
          <Stacks gap={4}>
            <Typography variant="h3">К оплате:</Typography>
            <Typography variant="h3" weight="bold" color="primary-second">
              {payment.amount} рублей
            </Typography>
          </Stacks>
          <Divider orientation="vertical" />
          <Stacks direction="column">
            <Typography variant="h5" color="secondary">
              Из чего состоит сумма:
            </Typography>
            {passengerTicket}
            {passengersHasBaggage && baggageTicket}
          </Stacks>
        </Stacks>

        <Grid gap={16} columns="1fr 1fr 1fr">
          {actions}
        </Grid>
      </Stacks>
    </Box>
  );
};
