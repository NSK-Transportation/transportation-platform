import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { Document, Identification, usePassengerStore } from "@/entities/passenger";
import { getPassenger } from "@/entities/passenger";
import { Box, Button, Input, Label, Stacks } from "@/shared/ui";

export const PassengerSearchForm = () => {
  const { setPassenger } = usePassengerStore();
  const [document, setDocument] = useState({
    series: "",
    number: "",
  } as Pick<Document, "series" | "number">);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<Identification>();

  const { refetch, isFetching } = useQuery(
    [`passenger`, document],
    () => getPassenger({ series: document.series, number: document.number }),
    {
      onSuccess(data) {
        setPassenger(data);
      },
      onError(error) {
        alert(error);
      },
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleClick = async () => {
    await refetch();
  };

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks gap={16} alignItems="flex-end">
        <Label variant="h3" text="Серия">
          <Input
            {...register("document.series", { required: "Введите серию паспорта" })}
            message={errors.document?.series?.message}
            onChange={(event) => setDocument({ ...document, series: event.target.value })}
            type="number"
            placeholder="Введите серию"
          />
        </Label>
        <Label variant="h3" text="Номер">
          <Input
            {...register("document.number", { required: "Введите номер паспорта" })}
            message={errors.document?.number?.message}
            onChange={(event) => setDocument({ ...document, number: event.target.value })}
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
