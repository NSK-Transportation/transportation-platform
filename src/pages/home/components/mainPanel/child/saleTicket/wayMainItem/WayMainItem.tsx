import { Box, Stacks, Typography } from "@/shared/ui";
import styles from "./WayMainItem.module.scss";
import { getFormatDate } from "@/shared/utils";
import { Location, WayDetails } from "../../../MainPanel.store";
import clsx from "clsx";
import { FC } from "react";

interface WayMainItemProps {
  item: WayDetails;
  isSelected: boolean;
  onClick: () => void;
}

export const WayMainItem: FC<WayMainItemProps> = ({ item, isSelected, onClick }) => {
  const renderLocation = ({ city, street, house, station, time, date }: Location): JSX.Element => (
    <Stacks direction="column">
      <Stacks gap={4} alignItems="flex-end">
        <Typography variant="h1" weight={600} color="primary-second">
          {time}
        </Typography>
        <Typography variant="h3" weight={600} color="primary">
          {`${getFormatDate(date, "day")}.${getFormatDate(date, "month")}`}
        </Typography>
      </Stacks>
      <Stacks direction="column">
        <Typography variant="h3" color="secondary">
          {city} - {station}
        </Typography>
        <Typography variant="h3" color="secondary">
          {street}, {house}
        </Typography>
      </Stacks>
    </Stacks>
  );

  return (
    <Box
      fullWidth
      className={clsx(styles.wayMainItem, {
        [styles.wayMainItem__selected]: isSelected,
      })}
      onClick={onClick}
    >
      <Stacks fullwidth gap={4} direction="column">
        <Stacks gap={8} alignItems="center">
          <Typography variant="h3">Рейс №{item.wayNumber}</Typography>
          <Typography variant="h3">{item.way}</Typography>
          <Typography color="secondary" variant="h4">
            Перевозчик: {item.whoArive}
          </Typography>
        </Stacks>

        <Stacks fullwidth justifyContent="space-between">
          {renderLocation(item.from)}
          {renderLocation(item.to)}

          <Stacks direction="column" justifyContent="space-between">
            <Stacks direction="column">
              <Typography variant="h3" color="secondary">
                Свободно мест: {item.seats.length}
              </Typography>
              <Typography variant="h3" color="info">
                Регулярный
              </Typography>
            </Stacks>
            <Typography variant="h3" color="secondary">
              В брони: {item.seats.filter((seat) => seat.status === "booking").length}
            </Typography>
          </Stacks>

          <Stacks direction="column" justifyContent="space-between">
            <Typography variant="h1" color="primary-second">
              {item.price} руб
            </Typography>
            <Stacks gap={4}>
              <Typography variant="h3" color="secondary">
                Багаж
              </Typography>
              <Typography variant="h3" color="info">
                +270 руб
              </Typography>
            </Stacks>
          </Stacks>
        </Stacks>
      </Stacks>
    </Box>
  );
};
