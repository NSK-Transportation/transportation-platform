import { Direction, Passenger } from "@/app/@types";
import { Box, Divider, Stacks, Typography } from "@/shared/ui";
import { useSearchParams } from "react-router-dom";
import { useInformationStore } from "../../../InformationPanel.store";
import { TicketInfo } from "../ticketInfo/TicketInfo";
import { SeatInfoWay } from "../seatInfoWay/SeatInfoWay";
import { useState } from "react";

export const SeatInfoPlace = () => {
  const { activeWay, passengers } = useInformationStore();
  const [searchParams] = useSearchParams();
  const step = parseInt(searchParams.get("step") || "0");
  const [visible, setVisible] = useState(true);

  const renderSeatInfo = (direction: Direction) => {
    return activeWay?.[direction]?.seatsSelected.map((seatId, index) => {
      const passenger = passengers.find(
        (passenger: Passenger) => passenger.ticket[direction]?.seatId === seatId,
      );
      const ticketType = passenger?.ticket?.[direction]?.type;

      return (
        <Stacks key={index} direction="column" gap={8}>
          <Stacks gap={8} fullwidth>
            <Typography variant="h3" weight={600}>
              Посадочное место:
            </Typography>
            <Typography variant="h3" weight={400}>
              {seatId}
            </Typography>
          </Stacks>
          {step >= 2 && ticketType && (
            <TicketInfo ticketType={ticketType} passenger={passenger!} direction={direction} />
          )}
        </Stacks>
      );
    });
  };

  return (
    <>
      <Box variant="dashed">
        <Stacks direction="column" gap={16}>
          {renderSeatInfo("there")}
          {step >= 3 && (
            <Stacks gap={8}>
              <Divider color="blue" orientation="vertical" width={2} />
              <Stacks direction="column" gap={8}>
                <Typography variant="h3" color="primary-second">
                  Обратный билет
                </Typography>
                <SeatInfoWay direction={"return"} visible={visible} setVisible={setVisible} />
                {visible && renderSeatInfo("return")}
              </Stacks>
            </Stacks>
          )}
        </Stacks>
      </Box>
    </>
  );
};
