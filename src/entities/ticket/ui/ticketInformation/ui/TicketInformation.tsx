/* eslint-disable @conarti/feature-sliced/layers-slices */
import { FC, ReactNode } from "react";
import { usePassengerStore } from "@/entities/passenger";
import { Box, Stacks, Typography } from "@/shared/ui";

interface Props {
  wayInfoThere: ReactNode;
  wayInfoReturn: ReactNode;
}

export const TicketInformation: FC<Props> = ({ wayInfoThere, wayInfoReturn }) => {
  const { passenger } = usePassengerStore();

  const ticketField = (name: string, value: unknown) => {
    return (
      <Stacks justifyContent="space-between">
        <Typography variant="h3" weight="bold">
          {name}:
        </Typography>
        <Typography variant="h3">{String(value) || "Неизвестно"}</Typography>
      </Stacks>
    );
  };

  return (
    <Box style={{ alignSelf: "flex-start" }}>
      <Stacks direction="column" gap={16}>
        <Typography variant="h3" color="secondary">
          Информация о билете
        </Typography>
        {passenger?.id && (
          <Stacks fullwidth gap={4} direction="column">
            {wayInfoThere}
            {ticketField("Посадочное место", passenger.ticket.there?.seatId)}
            {ticketField("Багажных мест", passenger.ticket.there?.baggage?.quantity)}
            {ticketField("Тип билета", passenger.ticket.there?.rus)}
            {ticketField("Вид скидки", passenger.ticket.there?.discount?.rus)}
            {passenger.identification?.student?.number &&
              ticketField("Номер студенческого", passenger.identification?.student?.number)}
            {passenger.identification?.military?.number &&
              ticketField("Номер справка", passenger.identification?.military?.number)}
            {ticketField("Тип оплаты", passenger.ticket.there?.payment?.rus)}
            {ticketField(
              "Кассир",
              `${passenger.ticket.there?.cashier?.lastName} ${passenger.ticket.there?.cashier?.firstName}`,
            )}
            {ticketField("Дата продажи", passenger.ticket.there?.saleDate)}
            {ticketField("Время продажи", passenger.ticket.there?.saleTime)}

            {!wayInfoReturn === null && wayInfoReturn}
            {!wayInfoReturn === null && (
              <>
                {ticketField("Посадочное место", passenger.ticket.return?.seatId)}
                {ticketField("Багажных мест", passenger.ticket.return?.baggage?.quantity)}
                {ticketField("Тип билета", passenger.ticket.return?.rus)}
                {ticketField("Вид скидки", passenger.ticket.return?.discount?.rus)}
                {passenger.identification?.student?.number &&
                  ticketField("Номер студенческого", passenger.identification?.student?.number)}
                {passenger.identification?.military?.number &&
                  ticketField("Номер справка", passenger.identification?.military?.number)}
                {ticketField("Тип оплаты", passenger.ticket.return?.payment?.rus)}
                {ticketField(
                  "Кассир",
                  `${passenger.ticket.return?.cashier?.lastName} ${passenger.ticket.return?.cashier?.firstName}`,
                )}
                {ticketField("Дата продажи", passenger.ticket.return?.saleDate)}
                {ticketField("Время продажи", passenger.ticket.return?.saleTime)}
              </>
            )}
          </Stacks>
        )}
      </Stacks>
    </Box>
  );
};
