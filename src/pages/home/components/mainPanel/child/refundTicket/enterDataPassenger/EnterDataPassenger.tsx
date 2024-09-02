import { Box, Button, Input, Label, Stacks } from "@/shared/ui";
import { useQuery } from "react-query";
import { useRefundTicket } from "../RefundTicket.store";

export const EnterDataPassenger = () => {
  const { passenger, setPassenger } = useRefundTicket();

  // FIXME: Убрать фейк запрос - заменить на реальный
  const fetchPassenger = async (series: string, _number: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/?id=${series}`);
    return response.json();
  };

  const { refetch, isFetching } = useQuery(
    ["passenger", passenger.identification?.series, passenger.identification?.number],
    () =>
      fetchPassenger(
        passenger.identification?.series ?? "",
        passenger.identification?.number ?? "",
      ),
    {
      onSuccess(data) {
        setPassenger({
          ...passenger,
          lastName: data[0].title,
          patronymic: data[0].title,
        });
      },
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleClick = async () => {
    if (!(passenger.identification?.series && passenger.identification?.number)) {
      alert("Пожалуйста, введите серию и номер");
      return;
    }

    try {
      await refetch();
    } catch (error) {
      console.error(error);
      alert("Ошибка при обновлении данных");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassenger({
      ...passenger,
      identification: {
        ...passenger.identification,
        [name]: value,
      },
    });
  };

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks gap={16} alignItems="flex-end">
        <Label variant="h3" text="Серия">
          <Input
            max={8}
            maxLength={8}
            name="series"
            value={passenger.identification?.series || ""}
            onChange={handleInputChange}
            placeholder="Введите серию"
          />
        </Label>
        <Label variant="h3" text="Номер">
          <Input
            max={8}
            maxLength={8}
            name="number"
            value={passenger.identification?.number || ""}
            onChange={handleInputChange}
            placeholder="Введите номер"
          />
        </Label>
        <Button
          style={{ height: "44.6px" }}
          label="Найти"
          loading={isFetching}
          onClick={handleClick}
        />
      </Stacks>
    </Box>
  );
};
