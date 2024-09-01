import { Direction, Passenger, TicketType } from "@/app/@types";
import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Box, Divider, Stacks, Typography } from "@/shared/ui";
import { useSearchParams } from "react-router-dom";
import { SeatInfoWay } from "../seatInfoWay/SeatInfoWay";
import { useState } from "react";

const PassengerInfo = ({ label, value }: { label: string; value: string | undefined | number }) => (
  <Stacks direction="row" gap={8}>
    <Typography variant="h3" weight={600}>
      {label}
    </Typography>
    <Typography variant="h3">{value || "-"}</Typography>
  </Stacks>
);

const PassengerDetails = ({ passenger }: { passenger?: Passenger }) => (
  <Stacks direction="column" gap={4}>
    <PassengerInfo label="Фамилия:" value={passenger?.lastName} />
    <PassengerInfo label="Имя:" value={passenger?.firstName} />
    <PassengerInfo label="Отчество:" value={passenger?.patronymic} />
    <PassengerInfo label="Дата рождения:" value={passenger?.birthday} />
    <PassengerInfo label="Пол:" value={passenger?.gender?.rus} />
    <PassengerInfo label="Телефон:" value={passenger?.phone} />
  </Stacks>
);

const TicketInfo = ({
  ticketType,
  passenger,
  direction,
}: {
  ticketType: TicketType;
  passenger: Passenger;
  direction: Direction;
}) => {
  if (!ticketType || !passenger) return null;

  return (
    <>
      <PassengerInfo label="Багажное место:" value={passenger?.ticket[direction].baggage?.rus} />
      <PassengerInfo label="Тип билета:" value={passenger.ticket[direction]?.rus} />
      {ticketType === "full" && (
        <>
          <PassengerInfo label="Тип документа:" value={passenger.identification?.document?.rus} />
          <PassengerDetails passenger={passenger} />
        </>
      )}
      {ticketType === "child" && (
        <>
          <PassengerInfo
            label="Скидка:"
            value={`${passenger.ticket[direction].discount?.value}%`}
          />
          <PassengerInfo
            label="Свидетельство о рожд.:"
            value={`${passenger.identification?.birthCertificateSeries} ${passenger.identification?.birthCertificateNumber}`}
          />
          <PassengerDetails passenger={passenger} />
        </>
      )}
      {ticketType === "privilege" && (
        <>
          <PassengerInfo label="Тип льготы:" value={passenger.identification?.privilege?.rus} />
          <PassengerDetails passenger={passenger} />
        </>
      )}
      {ticketType === "discount" && (
        <>
          <PassengerInfo label="Вид скидки:" value={passenger.ticket[direction].discount?.rus} />
          <PassengerInfo label="Номер документа:" value={passenger.identification?.number} />
          <PassengerDetails passenger={passenger} />
        </>
      )}
    </>
  );
};

export const SeatInfoPlace = () => {
  const { direction, passengers, activeWay } = useMainStore((state) => state.saleTicket);
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";
  const [visible, setVisible] = useState(false);

  return (
    <>
      {activeWay?.[direction]?.seatsSelected?.map((seat, index) => {
        const passenger = passengers[index];
        const ticketType = passenger?.ticket?.[direction].type;

        return (
          <Box key={index} variant="dashed">
            <Stacks direction="column" gap={8}>
              <Stacks gap={8} fullwidth>
                <Typography variant="h3" weight={600}>
                  Посадочное место:
                </Typography>
                <Typography variant="h3" weight={400}>
                  {seat}
                </Typography>
              </Stacks>
              {step >= "2" && ticketType && (
                <TicketInfo ticketType={ticketType} passenger={passenger} direction={direction} />
              )}
              {direction === "return" && (
                <Stacks gap={8}>
                  <Divider color="blue" orientation="vertical" width={2} />
                  <Stacks direction="column" fullwidth gap={8}>
                    <Typography variant="h3" color="info">
                      Обратный билет:
                    </Typography>
                    <SeatInfoWay visible={visible} setVisible={setVisible} />
                    {visible && (
                      <Stacks key={index} direction="column" gap={8}>
                        <Stacks gap={8} direction="row" fullwidth>
                          <Typography variant="h3" weight={600}>
                            Посадочное место:
                          </Typography>
                          <Typography variant="h3" weight={400}>
                            {seat}
                          </Typography>
                        </Stacks>
                        {step >= "2" && ticketType && (
                          <>
                            <TicketInfo
                              ticketType={ticketType}
                              passenger={passenger}
                              direction={direction}
                            />
                          </>
                        )}
                      </Stacks>
                    )}
                  </Stacks>
                </Stacks>
              )}
            </Stacks>
          </Box>
        );
      })}
    </>
  );
};
