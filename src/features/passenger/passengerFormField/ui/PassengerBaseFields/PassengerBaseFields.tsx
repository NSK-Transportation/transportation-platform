import { FC } from "react";
import { useCountryStore } from "@/entities/country";
import { Passenger } from "@/entities/passenger";
import { Direction } from "@/shared/types";
import { Input, Label, RadioGroup, CountrySelect } from "@/shared/ui";

interface Props {
  passenger: Passenger;
  direction: Direction;
  onChange: (update: Partial<Passenger>) => void;
}

export const PassengerBaseFields: FC<Props> = ({ passenger, direction, onChange }) => {
  const {
    options: { countries },
  } = useCountryStore();

  return (
    <>
      <Label variant="h3" text="Фамилия">
        <Input
          value={passenger.lastName}
          onChange={(event) => onChange({ lastName: event.target.value })}
          placeholder="Например, Плеханова"
        />
      </Label>
      <Label variant="h3" text="Имя">
        <Input
          value={passenger.firstName}
          onChange={(event) => onChange({ firstName: event.target.value })}
          placeholder="Например, Татьяна"
        />
      </Label>
      <Label variant="h3" text="Отчество">
        <Input
          value={passenger.patronymic}
          placeholder="Например, Фёдоровна"
          onChange={(event) => onChange({ patronymic: event.target.value })}
        />
      </Label>
      <Label variant="h3" text="Дата рождения">
        <Input
          type="date"
          value={passenger.birthday}
          onChange={(event) => onChange({ birthday: event.target.value })}
        />
      </Label>
      <Label variant="h3" text="Телефон">
        <Input
          value={passenger.phone.number}
          placeholder="+ 7 (---) --- -- --"
          onChange={(event) =>
            onChange({
              phone: {
                ...passenger.phone,
                number: event.target.value,
              },
            })
          }
          slotsLeft={
            <CountrySelect
              options={countries}
              onChange={(event) =>
                onChange({
                  phone: {
                    ...passenger.phone,
                    code: event.target.value,
                  },
                })
              }
            />
          }
        />
      </Label>
      <Label variant="h3" text="Пол">
        <RadioGroup
          direction="row"
          name="gender"
          radios={[
            { value: "men", title: "Мужской" },
            { value: "women", title: "Женский" },
          ]}
          selected={passenger.gender || ""}
          onChange={(value) =>
            onChange({
              ...passenger,
              gender: value as "male" | "female",
            })
          }
        />
      </Label>
    </>
  );
};
