import { useState } from "react";
import { PassengerTicketInfo, usePassengerStore } from "@/entities/passenger";
import { usePaymentStore } from "@/entities/payment";
import { SeatPlace } from "@/entities/seat";
import { WayInfo } from "@/entities/way";
import { useWayDetailStore } from "@/entities/wayDetails";
import { ArrowDownIcon, ArrowUpIcon } from "@/shared/assets";
import { Box, Stacks, Typography } from "@/shared/ui";

export const InformationPanel = () => {
  const { passengers } = usePassengerStore();
  const { activeWay } = useWayDetailStore();
  const { payment } = usePaymentStore();
  const [visible, setVisible] = useState(true);

  if (!(activeWay.there ?? activeWay.return)) {
    return <Box style={{ height: "100%" }} text="Данных нет" />;
  }

  const selectedSeats = activeWay?.there?.seats?.filter((seat) => seat.status === "selected");

  return (
    <Stacks direction="column">
      <Box border="up">
        <Stacks direction="column" gap={16}>
          <WayInfo
            activeWay={activeWay.there}
            actions={
              <>
                {selectedSeats && selectedSeats?.length > 0 && (
                  <Typography
                    onClick={() => setVisible(!visible)}
                    cursor="pointer"
                    variant="h4"
                    color="secondary"
                  >
                    <Stacks alignItems="center" gap={2}>
                      Детали рейса
                      {visible ? <ArrowDownIcon /> : <ArrowUpIcon />}
                    </Stacks>
                  </Typography>
                )}
              </>
            }
          />

          {visible &&
            passengers.map((passenger) => (
              <Box key={passenger.id} variant="dashed">
                <Stacks direction="column" gap={16}>
                  {passenger.ticket.there?.wayDetail?.id && (
                    <SeatPlace
                      passenger={passenger}
                      direction={"there"}
                      passengerInfo={
                        passenger.ticket.there.type && (
                          <PassengerTicketInfo passenger={passenger} direction={"there"} />
                        )
                      }
                    />
                  )}
                  {passenger.ticket.return && (
                    <SeatPlace
                      passenger={passenger}
                      direction={"return"}
                      passengerInfo={
                        passenger.ticket.return.type && (
                          <PassengerTicketInfo passenger={passenger} direction={"return"} />
                        )
                      }
                      wayInfo={
                        activeWay.return && (
                          <WayInfo
                            border
                            activeWay={activeWay.return}
                            typography={
                              <Typography variant="h3" color="primary-second" weight={600}>
                                Обратный билет
                              </Typography>
                            }
                          />
                        )
                      }
                    />
                  )}
                </Stacks>
              </Box>
            ))}
        </Stacks>
      </Box>
      <Box color="blue" border="down">
        <Stacks justifyContent="flex-end">
          <Typography variant="h1" color="default-white">
            {payment.amount} руб
          </Typography>
        </Stacks>
      </Box>
    </Stacks>
  );
};
