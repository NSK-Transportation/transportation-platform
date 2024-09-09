import { Box, Chip, Divider, Grid, Stacks, Typography } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSaleTicket } from "../SaleTicket.store";
import { Direction, Seat } from "@/app/@types";
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
    tickets,
    discount: { main, child },
    baggages,
    privileges,
    documents,
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
                <FormFields
                  configGroup={config.step1}
                  passengerInfo={passengerInfo}
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

              {passengerInfo.ticket[direction]?.type && (
                <>
                  <Divider />

                  <Grid columns="repeat(2, 1fr)" gap={16} alignItems="flex-start">
                    {passengerInfo.ticket?.[direction]?.type && (
                      <FormFields
                        configGroup={config.step2[passengerInfo.ticket[direction].type]}
                        passengerInfo={passengerInfo}
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

                    {(passengerInfo.ticket?.[direction]?.discount?.type === "student" ||
                      passengerInfo.ticket?.[direction]?.discount?.type === "military") &&
                      passengerInfo.ticket?.[direction]?.type === "discount" && (
                        <FormFields
                          configGroup={
                            config.step3[passengerInfo?.ticket?.[direction]?.discount?.type || ""]
                          }
                          passengerInfo={passengerInfo}
                          setPassenger={setPassenger}
                          direction={direction}
                          activeWay={activeWay}
                        />
                      )}
                  </Grid>

                  <Divider />

                  <Grid columns="repeat(2, 1fr)" gap={16}>
                    {passengerInfo.ticket?.[direction]?.type && (
                      <FormFields
                        configGroup={config.common}
                        passengerInfo={passengerInfo}
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
        );
      })}
    </Box>
  );
};
