import { Passenger, Direction, TicketType, Options } from "@/app/@types";
import { Stacks, Typography } from "@/shared/ui";
import { type Config, config } from "./TicketInfo.config";
import _ from "lodash";
import { getResolveKeyPath } from "@/shared/utils";
import { SaleTicketStore } from "@/pages/home/components/mainPanel";

type PassengerWithDirection = Passenger & { direction: Direction };

export const PassengerInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined | number;
}) => (
  <Stacks direction="row" gap={8}>
    <Typography variant="h3" weight={600}>
      {label}
    </Typography>
    <Typography variant="h3">{value || "-"}</Typography>
  </Stacks>
);

export const TicketInfo = ({
  ticketType,
  passenger,
  direction,
  options,
}: {
  ticketType: TicketType;
  passenger: Passenger;
  direction: Direction;
  options: Options<SaleTicketStore["options"]>;
}) => {
  const renderFields = (config: Config[], passenger: Passenger) => {
    const groupedFields = _.groupBy(config, "group");

    return _.map(groupedFields, (fields, group) => (
      <>
        {group != "undefined" ? (
          <Stacks key={group}>
            {fields.map(({ label, key, optionsKey }, index) => {
              const value = _.get(passenger, getResolveKeyPath(key || "", { direction }));
              const rus = options?.[optionsKey || ""]?.find(
                (option: any) => option.type === value,
              )?.rus;

              return (
                <PassengerInfo
                  key={index}
                  label={label}
                  value={options?.[optionsKey || ""] ? rus : value}
                />
              );
            })}
          </Stacks>
        ) : (
          <>
            {fields.map(({ label, key, optionsKey }, index) => {
              const value = _.get(passenger, getResolveKeyPath(key || "", { direction }));
              const rus = options?.[optionsKey || ""]?.find(
                (option: any) => option.type === value,
              )?.rus;

              return (
                <PassengerInfo
                  key={index}
                  label={label}
                  value={options?.[optionsKey || ""] ? rus : value}
                />
              );
            })}
          </>
        )}
      </>
    ));
  };

  if (!ticketType || !passenger) return null;

  let ticketConfig: Config[];

  switch (ticketType) {
    case "full":
      ticketConfig = config.fullTicket;
      break;
    case "child":
      ticketConfig = config.childTicket;
      break;
    case "privilege":
      ticketConfig = config.privilegeTicket;
      break;
    case "discount":
      ticketConfig = config.discountTicket;
      break;
    default:
      return null;
  }

  return (
    <>
      {renderFields(ticketConfig, { ...passenger, direction } as PassengerWithDirection)}
      {renderFields(config.passenger, passenger)}
    </>
  );
};
