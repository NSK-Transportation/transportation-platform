import { Box, Checkbox, Chip, Stacks, Typography } from "@/shared/ui";
import { FC } from "react";
import { WayDetails } from "@/app/@types";

interface WayManagementItemProps {
  item: WayDetails;
  isSelected: boolean;
  onClick: () => void;
}

export const WayManagementItem: FC<WayManagementItemProps> = ({ item, isSelected, onClick }) => {
  return (
    <Box
      style={{
        cursor: "pointer",
        border: isSelected ? "1px solid var(--color-blue-70)" : "1px solid transparent",
      }}
      onClick={onClick}
    >
      <Stacks justifyContent="space-between" gap={30} direction="row">
        <Stacks gap={10} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Stacks gap={20} direction="row">
            <Checkbox label="" />
            <Typography variant="h1" weight={600} color="primary-second">
              {item.from.time}
            </Typography>
            <Typography color="info" variant="h4">
              {item.from.date}
            </Typography>
          </Stacks>
        </Stacks>

        <Stacks gap={10} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Typography variant="h3" weight={400} color="primary">
            {item.from.station} - {item.to.station}
          </Typography>
          {isSelected && (
            <Stacks gap={3} direction="row">
              <Typography color="default-black" variant="h4">
                Водитель:
              </Typography>
              <Typography color="default-black" weight={600} variant="h4">
                {item.bus.driver}
              </Typography>
            </Stacks>
          )}
        </Stacks>

        <Stacks gap={10} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Stacks gap={20} direction="row">
            <Chip size="small" variant="warning" label={"Отправлен"} />
            <Stacks gap={3} direction="row">
              <Typography color="default-black" variant="h3" weight={200}>
                Свободных мест:
              </Typography>
              <Typography color="default-black" weight={600} variant="h3">
                {item.bus.free}
              </Typography>
            </Stacks>
          </Stacks>
          {isSelected && (
            <Stacks gap={20} direction="row">
              <Typography color="default-black" variant="h4" weight={200}>
                АТП. сокр
              </Typography>
              <Typography color="default-black" weight={600} variant="h4">
                {item.bus.atpType}
              </Typography>
            </Stacks>
          )}
        </Stacks>

        <Stacks gap={10} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Stacks gap={20} direction="row">
            <Stacks gap={3} direction="row">
              <Typography color="default-black" variant="h3" weight={200}>
                Занято:
              </Typography>
              <Typography color="default-black" weight={600} variant="h3">
                {item.bus.occupied}
              </Typography>
            </Stacks>
          </Stacks>
          {isSelected && (
            <Typography color="default-black" weight={500} variant="h4">
              {item.bus.busNumber}
            </Typography>
          )}
        </Stacks>

        <Stacks gap={10} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Typography color="default-black" weight={500} variant="h3">
            {item.bus.busNumber}
          </Typography>
          {isSelected && (
            <Typography color="default-black" weight={500} variant="h4">
              {item.bus.typeBus}
            </Typography>
          )}
        </Stacks>

        <Stacks direction="row" gap={8} justifyContent="space-between">
          <Typography variant="h3" color="default-black" weight={300}>
            Прибыл:
          </Typography>
          <Typography variant="h3" color="primary" weight={700}>
            {"13:20"}
          </Typography>
          <Typography variant="h3" color="default-black" weight={300}>
            {"26 авг."}
          </Typography>
        </Stacks>
      </Stacks>
    </Box>
  );
};
