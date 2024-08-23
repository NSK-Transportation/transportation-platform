import { Box, Stacks, Typography } from "@/shared/ui";
import { FC } from "react";
import { Location, WayDetails } from "@/app/@types";

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
          {date}
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
      style={{
        cursor: "pointer",
        border: isSelected ? "1px solid var(--color-blue-70)" : "1px solid transparent",
      }}
      onClick={onClick}
    >
      <Stacks fullwidth gap={4} direction="column">
        <Stacks gap={8} alignItems="center">
          <Typography variant="h3">Рейс №{item?.wayNumber}</Typography>
          <Typography variant="h3">
            {item?.from.city} - {item?.to.city}
          </Typography>
          <Typography color="secondary" variant="h4">
            Перевозчик: {item?.whoArive}
          </Typography>
        </Stacks>

        <Stacks fullwidth justifyContent="space-between">
          {renderLocation(item?.from)}
          {renderLocation(item?.to)}

          <Stacks direction="column" justifyContent="space-between">
            <Stacks direction="column">
              <Typography variant="h3" color="secondary">
                Свободно мест: {item?.seats?.length}
              </Typography>
              <Typography variant="h3" color="info">
                Регулярный
              </Typography>
            </Stacks>
            <Typography variant="h3" color="secondary">
              В брони: {item?.seats.filter((seat) => seat.status === "booking").length}
            </Typography>
          </Stacks>

          <Stacks direction="column" justifyContent="space-between">
            <Typography variant="h1" color="primary-second">
              {item?.price} руб
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
