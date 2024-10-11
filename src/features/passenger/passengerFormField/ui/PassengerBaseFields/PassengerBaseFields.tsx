import _ from "lodash";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCountryStore } from "@/entities/country";
import { Passenger } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { Input, Label, RadioGroup, CountrySelect } from "@/shared/ui";
// import { getFormatPhoneNumber } from "@/shared/utils/getFormatPhoneNumber.ts";

interface Props {
  passenger: Passenger;
  direction: Direction;
  onChange: (update: Partial<Passenger>) => void;
  setFormComplete: (isComplete: boolean) => void;
}

export const PassengerBaseFields: FC<Props> = ({ passenger, onChange, setFormComplete }) => {
  const {
    options: { countries },
  } = useCountryStore();

  const { register, trigger } = useForm<Passenger>({
    defaultValues: passenger,
    mode: "all",
  });

  const isFormComplete = (passenger: Passenger): boolean =>
    !!passenger.lastName &&
    !!passenger.firstName &&
    !!passenger.patronymic &&
    !!passenger.birthday &&
    !!passenger.phone?.number &&
    !!passenger.phone?.code &&
    !!passenger.gender;

  useEffect(() => {
    const completeStatus = isFormComplete(passenger);
    setFormComplete(completeStatus);
  }, [passenger, setFormComplete]);

  const handleFieldChange = (field: string, value: string) => {
    const clonedPassenger = _.cloneDeep(passenger);
    const updatedPassenger = _.merge(clonedPassenger, _.set({}, field, value));
    onChange(updatedPassenger);
    trigger(field as keyof Passenger, { shouldFocus: true });
  };

  return (
    <>
      <Label variant="h3" text="Фамилия" required>
        <Input
          {...register("lastName")}
          placeholder="Например, Плеханова"
          type="text"
          autoComplete="true"
          autoCorrect="true"
          required
          onChange={(event) => handleFieldChange("lastName", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Имя" required>
        <Input
          {...register("firstName")}
          placeholder="Например, Татьяна"
          type="text"
          autoComplete="true"
          autoCorrect="true"
          required
          onChange={(event) => handleFieldChange("firstName", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Отчество" required>
        <Input
          {...register("patronymic")}
          placeholder="Например, Фёдоровна"
          type="text"
          autoComplete="true"
          autoCorrect="true"
          required
          onChange={(event) => handleFieldChange("patronymic", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Дата рождения" required>
        <Input
          {...register("birthday")}
          type="date"
          autoComplete="true"
          autoCorrect="true"
          required
          onChange={(event) => handleFieldChange("birthday", event.target.value)}
        />
      </Label>
      <Label variant="h3" text="Телефон" required>
        <Input
          {...register("phone.number")}
          // value={getFormatPhoneNumber(passenger.phone.number, "(xxx) xxx-xx-xx")}
          placeholder="(---) --- -- --"
          onChange={(event) => handleFieldChange("phone.number", event.target.value)}
          type="tel"
          autoComplete="true"
          autoCorrect="true"
          required
          slotsLeft={
            <CountrySelect
              {...register("phone.code")}
              options={countries}
              onChange={(event) => handleFieldChange("phone.code", event.target.value)}
            />
          }
        />
      </Label>
      <Label variant="h3" text="Пол" required>
        <RadioGroup
          {...register("gender")}
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
