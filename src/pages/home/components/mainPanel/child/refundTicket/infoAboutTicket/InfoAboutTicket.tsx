import { Box, Stacks, Typography } from "@/shared/ui";
import { useMainStore } from "../../../MainPanel.store";

export const InfoAboutTicket = () => {
  const { passenger } = useMainStore((state) => state.refundTicket);

  const fields: { label: string; value: string | number | undefined; color?: string }[] = [
    {
      label: "Посадочное место",
      value: passenger.ticket.seatId || "Null",
    },
    {
      label: "Багажное место",
      value: passenger.ticket.baggage?.type || "Без багажа",
    },
    {
      label: "Тип билета",
      value: passenger.ticket.type || "Null",
      color: "primary",
    },
    {
      label: "Вид скидки",
      value: passenger.ticket.discount?.type || "Null",
      color: "info",
    },
    {
      label: "Скидка",
      value: passenger.ticket.discount?.value || "Null",
      color: "info",
    },
    {
      label: "Номер студенческого / справки",
      value:
        passenger.ticket.identification?.militaryCertificateNumber ||
        passenger.ticket.identification?.studentTicketNumber ||
        "Null",
    },
    {
      label: "Тип оплаты",
      value: passenger.ticket.payment?.rus || "Null",
      color: "info",
    },
    {
      label: "Кассир",
      value: passenger.ticket.cashier?.name || "Null",
    },
    {
      label: "Касса",
      value: passenger.ticket.cashRegister?.number || "Null",
    },
    {
      label: "Дата продажи",
      value: passenger.ticket.saleDate || "Null",
      color: "info",
    },
    {
      label: "Время продажи",
      value: passenger.ticket.saleTime || "Null",
      color: "info",
    },
  ];

  return (
    <Box style={{ alignSelf: "flex-start" }}>
      <Stacks direction="column" gap={16}>
        <Typography variant="h3" color="secondary">
          Информация о билете
        </Typography>
        {passenger.ticket.seatId && 
          fields.map((field, index) => (
            <Stacks key={index} gap={4}>
              <Typography variant="h3" weight={600}>
                {field.label}:
              </Typography>
              <Typography variant="h3" color={field.color as "primary" | "info" | "secondary"}>
                {field.value}
              </Typography>
            </Stacks>
          ))}
      </Stacks>
    </Box>
  );
};
