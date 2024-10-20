import { Box, Stacks, Typography } from "@/shared/ui";
import { usePassengerStore } from "../../../model/store/passenger.store";

export const PassengerInformation = () => {
  const { passenger } = usePassengerStore();

  const passengerField = (name: string, value: unknown) => {
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
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks fullwidth direction="column" gap={8}>
        <Typography variant="h3" color="secondary">
          Информация о пассажире
        </Typography>
        {passenger?.id && (
          <Box variant="dashed">
            <Stacks fullwidth gap={4} direction="column">
              {passengerField("Тип документа", passenger.identification?.document?.rus)}
              {passengerField("Серия", passenger.identification?.document?.series)}
              {passengerField("Номер", passenger.identification?.document?.number)}
              {passengerField("Фамилия", passenger.lastName)}
              {passengerField("Имя", passenger.firstName)}
              {passengerField("Отчество", passenger.patronymic)}
              {passengerField("Дата рождения", passenger.birthday)}
              {passengerField("Пол", passenger.gender.rus)}
              {passengerField("Телефон", `${passenger.phone.code} ${passenger.phone.number}`)}
            </Stacks>
          </Box>
        )}
      </Stacks>
    </Box>
  );
};
