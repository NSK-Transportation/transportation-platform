import { Box, Chip, Grid, Stacks, Typography } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSaleTicket } from "../SaleTicket.store";
import { Field } from "./PassengerInfoItem.utils";
import { Direction, Passenger, Seat } from "@/app/@types";
import { Config, config } from "./PassengerInfoItem.config";

interface PassengerInfoItemProps {
  direction: Direction;
}

export const PassengerInfoItem = ({ direction }: PassengerInfoItemProps) => {
  const {
    activeWay,
    passengers,
    setPassenger,
    tickets,
    discount: { main, child },
    baggages,
    privileges,
    genders,
  } = useSaleTicket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeWay || passengers.length === 0) {
      navigate(
        {
          pathname: "/home/sale-ticket",
          search: "?step=1",
        },
        { replace: true },
      );
      navigate(0);
    }
  }, [activeWay, passengers, navigate]);

  if (!activeWay || passengers.length === 0) {
    return <Typography variant="h3">Маршрут или пассажиры не найдены</Typography>;
  }

  const renderFields = (fields: Config[], passengerInfo: Passenger) => {
    return fields?.map((field) => (
      <Field
        key={field.key}
        config={field}
        passengerInfo={passengerInfo}
        options={{
          tickets,
          main,
          child,
          baggages,
          privileges,
          genders,
        }}
        setPassenger={setPassenger}
        direction={direction}
        activeWay={activeWay}
      />
    ));
  };

  return (
    <Box>
      {activeWay[direction]?.seatsSelected.map((seatId: Seat["id"]) => {
        const passengerInfo = passengers.find(
          (passenger) => passenger.ticket?.[direction]?.seatId === seatId,
        );

        if (!passengerInfo) return null;

        return (
          <Stacks direction="column" gap={16}>
            <Stacks gap={8}>
              <Typography variant="h3">Данные пассажира </Typography>
              <Chip variant="primary" size="small" label={`Место ${seatId}`} />
            </Stacks>
            <Grid gap={16} key={seatId}>
              <Grid columns="repeat(2, 1fr)" gap={16}>
                {renderFields(config.step1, passengerInfo)}
              </Grid>

              <Grid columns="repeat(2, 1fr)" gap={16}>
                {passengerInfo.ticket?.[direction]?.type &&
                  renderFields(config.step2[passengerInfo.ticket[direction].type], passengerInfo)}
              </Grid>

              <Grid columns="repeat(2, 1fr)" gap={16}>
                {passengerInfo.ticket?.[direction]?.type &&
                  renderFields(config.common, passengerInfo)}
              </Grid>
            </Grid>
          </Stacks>
        );
      })}
    </Box>
  );
};
