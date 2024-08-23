import { Passenger, TicketType } from "@/app/@types";
import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Box, Stacks, Typography } from "@/shared/ui";
import { useSearchParams } from "react-router-dom";

interface SeatInfoPlace {
  passenger: Passenger;
  ticketType?: TicketType;
}

const PassengerInfo = ({ label, value }: { label: string; value: string | undefined | number }) => (
  <Stacks direction="row" gap={8}>
    <Typography variant="h3" weight={600}>
      {label}
    </Typography>
    <Typography variant="h3">{value || "-"}</Typography>
  </Stacks>
);

const PassengerDetails = ({ passenger }: SeatInfoPlace) => (
  <Stacks direction="column" gap={4}>
    <PassengerInfo label="Фамилия:" value={passenger.lastName} />
    <PassengerInfo label="Имя:" value={passenger.firstName} />
    <PassengerInfo label="Отчество:" value={passenger.patronymic} />
    <PassengerInfo label="Дата рождения:" value={passenger.birthday} />
    <PassengerInfo label="Пол:" value={passenger.gender?.rus} />
    <PassengerInfo label="Телефон:" value={passenger.phone} />
  </Stacks>
);

const TicketInfo = ({ ticketType, passenger }: SeatInfoPlace) => {
  if (!ticketType || !passenger) return null;

  switch (ticketType) {
    case "full":
      return (
        <>
          <PassengerInfo label="Багажное место:" value={passenger.ticket.baggage?.rus} />
          <PassengerInfo label="Тип билета:" value={passenger.ticket?.rus} />
          <PassengerInfo label="Тип документа:" value={passenger.identification?.document?.rus} />
          <PassengerDetails passenger={passenger} ticketType={"full"} />
        </>
      );
    case "child":
      return (
        <>
          <PassengerInfo label="Багажное место:" value={passenger.ticket.baggage?.rus} />
          <PassengerInfo label="Тип билета:" value={passenger.ticket.rus} />
          <PassengerInfo label="Скидка:" value={`${passenger.ticket.discount?.value}${"%"}`} />
          <PassengerInfo
            label="Свидетельство о рожд.:"
            value={`${passenger.identification?.birthCertificateSeries} ${passenger.identification?.birthCertificateNumber}`}
          />
          <PassengerDetails passenger={passenger} ticketType={"child"} />
        </>
      );
    case "privilege":
      return (
        <>
          <PassengerInfo label="Багажное место:" value={passenger.ticket.baggage?.rus} />
          <PassengerInfo label="Тип билета:" value={passenger.ticket?.rus} />
          <PassengerInfo label="Тип льготы:" value={passenger.identification?.privilege?.rus} />
          <PassengerDetails passenger={passenger} ticketType={"privilege"} />
        </>
      );
    case "discount":
      return (
        <>
          <PassengerInfo label="Багажное место:" value={passenger.ticket.baggage?.rus} />
          <PassengerInfo label="Тип билета:" value={passenger.ticket?.rus} />
          <PassengerInfo label="Вид скидки:" value={passenger.ticket.discount?.rus} />
          <PassengerInfo label="Номер документа:" value={passenger.identification?.number} />
          <PassengerDetails passenger={passenger} ticketType={"discount"} />
        </>
      );
    default:
      return null;
  }
};

export const SeatInfoPlace = () => {
  const { passengers, activeWay } = useMainStore((state) => state.saleTicket);
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";

  return activeWay?.seatsSelected.map((seat, index) => {
    const passenger = passengers[index];
    const ticketType = passenger?.ticket?.type;

    return (
      <Box key={index} variant="dashed">
        <Stacks direction="column" gap={8}>
          <Stacks gap={8} direction="row" fullwidth>
            <Typography variant="h3" weight={600}>
              Посадочное место:
            </Typography>
            <Typography variant="h3" weight={400}>
              {seat}
            </Typography>
          </Stacks>
          {step === "2" && ticketType !== "" && (
            <TicketInfo ticketType={ticketType} passenger={passenger} />
          )}
        </Stacks>
      </Box>
    );
  });
};
