import { Passenger, Direction, TicketType } from "@/app/@types";
import { Stacks, Typography } from "@/shared/ui";
import { type Config, config } from "./TicketInfo.config";
import _ from "lodash";
import { getResolveKeyPath } from "@/shared/utils";
import { Store } from "../../../InformationPanel.store";

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
  options: Store["options"];
}) => {
  const renderFields = (config: Config[], passenger: Passenger) => {
    return config.map(({ label, key, optionsKey }, index) => {
      const value = _.get(passenger, getResolveKeyPath(key, { direction }));
      const option = _.get(options, optionsKey); // TODO: Изменить на rus значение
      return <PassengerInfo key={index} label={label} value={value} />;
    });
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
      <Stacks direction="column" gap={4}>
        {renderFields(config.passenger, passenger)}
      </Stacks>
    </>
  );
};
