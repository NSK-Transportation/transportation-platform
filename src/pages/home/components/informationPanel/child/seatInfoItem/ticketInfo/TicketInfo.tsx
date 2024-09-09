import { Passenger, Direction, TicketType } from "@/app/@types";
import { Stacks, Typography } from "@/shared/ui";

export const PassengerInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined | number;
}) => (
  <Stacks direction="row" gap={8}>
    <Typography variant="h3" weight={600}>
      {label}
    </Typography>
    <Typography variant="h3">{value || "-"}</Typography>
  </Stacks>
);

export const PassengerDetails = ({ passenger }: { passenger?: Passenger }) => (
  <Stacks direction="column" gap={4}>
    <PassengerInfo label="Фамилия:" value={passenger?.lastName} />
    <PassengerInfo label="Имя:" value={passenger?.firstName} />
    <PassengerInfo label="Отчество:" value={passenger?.patronymic} />
    <PassengerInfo label="Дата рождения:" value={passenger?.birthday} />
    <PassengerInfo label="Пол:" value={passenger?.gender?.rus} />
    <PassengerInfo label="Телефон:" value={passenger?.phone} />
  </Stacks>
);

export const TicketInfo = ({
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
