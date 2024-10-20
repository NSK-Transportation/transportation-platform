import { useKeyboard } from "@siberiacancode/reactuse";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Identification, usePassengerStore } from "@/entities/passenger";
import { getPassenger } from "@/entities/passenger";
import { Box, Button, Input, Label, Stacks } from "@/shared/ui";

export const PassengerSearchForm = () => {
  const { setPassenger, passenger } = usePassengerStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<Identification>();

  const series = getValues().document?.series || "";
  const number = getValues().document?.number || "";

  const { refetch, isFetching } = useQuery(
    [`passenger`, passenger],
    () => getPassenger({ series, number }),
    {
      onSuccess(data) {
        setPassenger(data);
      },
      onError(error) {
        toast(`Ошибка: ${error}`);
      },
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleClick = async () => {
    await refetch();
  };

  useKeyboard({ onKeyDown: (event) => event.key === "Enter" && handleSubmit(handleClick)() });

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks gap={16} alignItems="flex-end">
        <Label variant="h3" text="Серия">
          <Input
            {...register("document.series", { required: "Введите серию паспорта" })}
            message={errors.document?.series?.message}
            type="number"
            placeholder="Введите серию"
          />
        </Label>
        <Label variant="h3" text="Номер">
          <Input
            {...register("document.number", { required: "Введите номер паспорта" })}
            message={errors.document?.number?.message}
            type="number"
            placeholder="Введите номер"
          />
        </Label>
        <Button
          style={{ height: "44.6px" }}
          label={isFetching ? "Поиск" : "Найти"}
          loading={isFetching}
          onClick={handleSubmit(handleClick)}
        />
      </Stacks>
    </Box>
  );
};
