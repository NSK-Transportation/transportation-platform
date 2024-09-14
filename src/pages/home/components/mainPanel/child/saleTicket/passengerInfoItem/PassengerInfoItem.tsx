import { Box, Chip, Divider, Grid, Stacks, Typography } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSaleTicket } from "../SaleTicket.store";
import { Direction, Passenger } from "@/app/@types";
import { config } from "./PassengerInfoItem.config";
import _ from "lodash";
import { FormFields } from "./PassengerInfoItem.form";

interface PassengerInfoItemProps {
  direction: Direction;
}

export const PassengerInfoItem = ({ direction }: PassengerInfoItemProps) => {
  const {
    activeWay,
    passengers,
    setPassenger,
    options: {
      tickets,
      discount: { main, child },
      baggages,
      privileges,
      documents,
      genders,
    },
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
        .map((passenger: Passenger, index) => {
          if (!passenger) return null;

          return (
            <Box key={index}>
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
                    <FormFields
                      configGroup={config.step1}
                      passenger={passenger}
                      setPassenger={setPassenger}
                      options={{
                        tickets,
                        main,
                        child,
                        baggages,
                        privileges,
                        genders,
                      }}
                      direction={direction}
                      activeWay={activeWay}
                    />
                  </Grid>

                  {passenger.ticket[direction]?.type && (
                    <>
                      <Divider />

                      <Grid columns="repeat(2, 1fr)" gap={16} alignItems="flex-start">
                        {passenger.ticket?.[direction]?.type && (
                          <FormFields
                            configGroup={config.step2[passenger.ticket[direction].type]}
                            passenger={passenger}
                            setPassenger={setPassenger}
                            options={{
                              tickets,
                              main,
                              child,
                              baggages,
                              documents,
                              privileges,
                            }}
                            direction={direction}
                            activeWay={activeWay}
                          />
                        )}

                        {(passenger.ticket?.[direction]?.discount?.type === "student" ||
                          passenger.ticket?.[direction]?.discount?.type === "military") &&
                          passenger.ticket?.[direction]?.type === "discount" && (
                            <FormFields
                              configGroup={
                                config.step3[passenger?.ticket?.[direction]?.discount?.type || ""]
                              }
                              passenger={passenger}
                              setPassenger={setPassenger}
                              direction={direction}
                              activeWay={activeWay}
                            />
                          )}
                      </Grid>

                      <Divider />

                      <Grid columns="repeat(2, 1fr)" gap={16}>
                        {passenger.ticket?.[direction]?.type && (
                          <FormFields
                            configGroup={config.common}
                            passenger={passenger}
                            setPassenger={setPassenger}
                            options={{
                              genders,
                            }}
                            direction={direction}
                            activeWay={activeWay}
                          />
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>
              </Stacks>
            </Box>
          );
        })}
    </>
  );
};
