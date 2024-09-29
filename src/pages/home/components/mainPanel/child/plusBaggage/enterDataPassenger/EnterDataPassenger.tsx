import { Box, Button, Input, Label, Stacks } from "@/shared/ui";
import { useQuery } from "react-query";
import { usePlusBaggage } from "../PlusBaggage.store";
import { getPassenger } from "@/shared/api/queries";
import { ChangeEvent } from "react";

export const EnterDataPassenger = () => {
  const { passenger, identification, setPassenger, setIdentification } = usePlusBaggage();
  console.log(passenger);
  const series = identification?.document?.series || "";
  const number = identification?.document?.number || "";

  const { refetch, isFetching } = useQuery(
    [`passenger`, series, number],
    () => getPassenger({ series, number }),
    {
      onSuccess(data) {
        setPassenger(data);
      },
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleClick = async () => {
    if (!(series && number)) {
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIdentification({
      ...identification,
      document: {
        ...identification.document,
        [name]: value || "",
      },
    });
  };

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks gap={16} alignItems="flex-end">
        <Label variant="h3" text="Серия">
          <Input
            maxLength={8}
            name="series"
            type="number"
            value={identification?.document?.series || ""}
            onChange={handleInputChange}
            placeholder="Введите серию"
          />
        </Label>
        <Label variant="h3" text="Номер">
          <Input
            maxLength={8}
            name="number"
            type="number"
            value={identification?.document?.number || ""}
            onChange={handleInputChange}
            placeholder="Введите номер"
          />
        </Label>
        <Button
          style={{ height: "44.6px" }}
          label="Найти"
          loading={isFetching}
          disabled={!(series && number)}
          onClick={handleClick}
        />
      </Stacks>
    </Box>
  );
};
