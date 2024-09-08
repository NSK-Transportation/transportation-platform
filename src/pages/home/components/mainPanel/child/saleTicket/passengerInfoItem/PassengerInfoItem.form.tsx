import { Config } from "./PassengerInfoItem.config";
import { Field } from "./PassengerInfoItem.utils";
import _ from "lodash";
import { Direction, Passenger } from "@/app/@types";
import { Store } from "../SaleTicket.store";
import { Stacks } from "@/shared/ui";

interface FormFieldsProps {
  configGroup: Config[];
  passengerInfo: Passenger;
  setPassenger: Store["setPassenger"];
  options?: any;
  direction: Direction;
  activeWay: Store["activeWay"];
}

export const FormFields = ({
  configGroup,
  passengerInfo,
  setPassenger,
  options,
  direction,
  activeWay,
}: FormFieldsProps) => {
  const groupedFields = _.groupBy(configGroup, "group");

  const ungroupedFields = groupedFields["undefined"] || [];

  return (
    <>
      {ungroupedFields.map((field: Config) => (
        <Field
          key={field.key}
          config={field}
          passengerInfo={passengerInfo}
          options={options}
          setPassenger={setPassenger}
          direction={direction}
          activeWay={activeWay}
        />
      ))}

      {Object.entries(groupedFields).map(([group, fields]) => {
        if (group === "undefined") return null;

        return (
          <Stacks key={group} gap={16}>
            {fields.map((field: Config) => (
              <Field
                key={field.key}
                config={field}
                passengerInfo={passengerInfo}
                options={options}
                setPassenger={setPassenger}
                direction={direction}
                activeWay={activeWay}
              />
            ))}
          </Stacks>
        );
      })}
    </>
  );
};
