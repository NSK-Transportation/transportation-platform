import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useCountryStore } from "@/entities/country";
import { Passenger, usePassengerStore } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { Input, Label, RadioGroup, CountrySelect } from "@/shared/ui";
import { passengerSchema } from "../../lib/validation/schema.tsx";

interface Props {
  passenger: Passenger;
  direction: Direction;
  onChange: (update: Partial<Passenger>) => void;
}

export const PassengerBaseFields: FC<Props> = ({ passenger, onChange }) => {
  const {
    options: { countries },
  } = useCountryStore();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<Partial<Passenger>>({
    defaultValues: passenger,
    resolver: yupResolver(passengerSchema),
    mode: "all",
  });

  const handleFieldChange = (field: keyof Passenger, value: string) => {
    onChange({ [field]: value });
    trigger(field, { shouldFocus: true });
  };

  return (
    <>
      <Label variant="h3" text="Фамилия">
        <Input
          {...register("lastName")}
          placeholder="Например, Плеханова"
          message={errors.lastName?.message}
          onChange={(event) => handleFieldChange("lastName", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Имя">
        <Input
          {...register("firstName")}
          placeholder="Например, Татьяна"
          message={errors.firstName?.message}
          onChange={(event) => handleFieldChange("firstName", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Отчество">
        <Input
          {...register("patronymic")}
          placeholder="Например, Фёдоровна"
          message={errors.patronymic?.message}
          onChange={(event) => handleFieldChange("patronymic", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Дата рождения">
        <Input
          type="date"
          {...register("birthday")}
          message={errors.birthday?.message}
          onChange={(event) => handleFieldChange("birthday", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Телефон">
        <Input
          {...register("phone.number")}
          placeholder="+ 7 (---) --- -- --"
          onChange={(event) => handleFieldChange("phone", event.target.value)}
          message={errors.phone?.number?.message || errors.phone?.code?.message}
          slotsLeft={
            <CountrySelect
              {...register("phone.code")}
              options={countries}
              onChange={(event) => handleFieldChange("phone", event.target.value)}
            />
          }
        />
      </Label>
      <Label variant="h3" text="Пол">
        <RadioGroup
          {...register("gender", { required: "Пол обязателен" })}
          direction="row"
          name="gender"
          radios={[
            { value: "men", title: "Мужской" },
            { value: "women", title: "Женский" },
          ]}
          selected={passenger.gender || ""}
          onChange={(value) => handleFieldChange("gender", value)}
        />
      </Label>
    </>
  );
};
