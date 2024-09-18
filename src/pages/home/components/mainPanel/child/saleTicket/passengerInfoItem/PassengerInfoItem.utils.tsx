import { Chip, CountrySelect, Input, Label, RadioGroup, Select, Stacks } from "@/shared/ui";
import { Config } from "./PassengerInfoItem.config";
import { Direction, Passenger } from "@/app/@types";
import { Store } from "../SaleTicket.store";
import { getFormatPhoneNumber, getResolveKeyPath } from "@/shared/utils";
import _ from "lodash";

interface FieldProps {
  config: Partial<Config>;
  passenger: Passenger;
  options: any;
  setPassenger: Store["setPassenger"];
  direction: Direction;
  activeWay: Store["activeWay"];
}

export const Field = ({
  config,
  passenger,
  options,
  setPassenger,
  direction,
  activeWay,
}: FieldProps) => {
  const { type, label, key, slots, placeholder, inputType, optionsKey } = config;

  const keyPaths = getResolveKeyPath(key || "", { direction });
  const value = _.get(passenger, keyPaths);

  const updatePassengerField = (passenger: Passenger, path: string[], value: any) => {
    let updatedPassenger = _.cloneDeep(passenger);
    _.set(updatedPassenger, path, value);
    return updatedPassenger;
  };

  const handleChange = (event: any) => {
    let newValue = event?.target?.value ?? event;

    if (key === "phone.number") {
      newValue = getFormatPhoneNumber(newValue);
    }
    
    setPassenger(
      passenger.id,
      direction,
      activeWay[direction],
      updatePassengerField(passenger, keyPaths, newValue),
    );
  };

  switch (type) {
    case "input":
      return (
        <Label variant="h3" text={label || ""} required>
          <Input
            slotsLeft={
              slots && (
                <CountrySelect
                  options={options?.[optionsKey || ""]}
                  onChange={(event) =>
                    setPassenger(passenger.id, direction, activeWay[direction], {
                      ...passenger,
                      phone: {
                        ...passenger.phone,
                        code: event?.target?.value,
                      },
                    })
                  }
                />
              )
            }
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            type={inputType || "text"}
          />
        </Label>
      );

    case "select":
      return (
        <Label variant="h3" text={label || ""} required>
          <Select
            placeholder={placeholder}
            options={options?.[optionsKey || ""]?.map((option: any) => ({
              label: option.rus,
              value: option.type,
            }))}
            value={value}
            onChange={handleChange}
          />
        </Label>
      );

    case "radioGroup":
      return (
        <Label variant="h3" text={label || ""} required>
          <RadioGroup
            direction="row"
            name={"radio"}
            radios={options?.[optionsKey || ""]?.map((option: any) => ({
              title: option.rus,
              value: option.type,
            }))}
            selected={value}
            onChange={handleChange}
          />
        </Label>
      );

    case "chip":
      return (
        <>
          <Stacks gap={16}>
            {options?.[optionsKey || ""]?.map((chip: any) => (
              <Chip
                key={chip.id}
                selected={passenger.ticket?.[direction]?.discount?.type === chip.type}
                onClick={() => handleChange({ target: { value: chip.type } })}
                size="extra-large"
                variant="outline"
                label={`${chip.rus} ${chip.value}%`}
              />
            ))}
          </Stacks>
        </>
      );

    default:
      return null;
  }
};
