import { Box, Stacks, Typography } from "@/shared/ui";
import { useRefundTicket } from "../RefundTicket.store";

export const InfoAboutPassenger = () => {
  const { passenger } = useRefundTicket();

  const fields: { label: string; value: string | undefined; color?: string }[] = [
    {
      label: "Тип документа",
      value: passenger.identification?.document?.rus || "Null",
    },
    {
      label: "Серия",
      value: passenger.identification?.series || "Null",
    },
    {
      label: "Номер",
      value: passenger.identification?.number || "Null",
    },
    {
      label: "Фамилия",
      value: passenger.lastName || "Null",
    },
    {
      label: "Имя",
      value: passenger.firstName || "Null",
    },
    {
      label: "Отчество",
      value: passenger.patronymic || "Null",
    },
    {
      label: "Дата рождения",
      value: passenger.birthday || "Null",
      color: "secondary",
    },
    {
      label: "Пол",
      value: passenger.gender || "Null",
      color: "secondary",
    },
    {
      label: "Телефон",
      value: passenger.phone || "Null",
      color: "primary",
    },
  ];

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks fullwidth direction="column" gap={8}>
        <Typography variant="h3" color="secondary">
          Информация о пассажире
        </Typography>
        {passenger.lastName && (
          <Box variant="dashed">
            <Stacks fullwidth gap={4} direction="column">
              {fields.map((field, index) => (
                <Stacks key={index} justifyContent="space-between">
                  <Typography variant="h3" weight="bold">
                    {field.label}:
                  </Typography>
                  <Typography variant="h3" color={field.color as "primary" | "secondary"}>
                    {field.value}
                  </Typography>
                </Stacks>
              ))}
            </Stacks>
          </Box>
        )}
      </Stacks>
    </Box>
  );
};
