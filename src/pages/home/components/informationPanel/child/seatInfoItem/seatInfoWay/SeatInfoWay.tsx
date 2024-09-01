import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Stacks, Typography } from "@/shared/ui";
import { Tooltip } from "@/shared/ui";

interface SeatInfoWayProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const SeatInfoWay = ({ visible, setVisible }: SeatInfoWayProps) => {
  const { direction, activeWay } = useMainStore((state) => state.saleTicket);

  return (
    <Stacks gap={8} direction="column" fullwidth>
      <Stacks gap={4} direction="row" justifyContent="space-between">
        <Stacks gap={4} direction="row">
          <Typography variant="h3">Рейс №{activeWay?.[direction]?.wayNumber}</Typography>
          <Typography variant="h3">
            {activeWay?.[direction]?.from.city} - {activeWay?.[direction]?.to.city}
          </Typography>
        </Stacks>
        <Tooltip text={activeWay?.[direction]?.whoArive ?? ""} direction="down">
          <Typography cursor="pointer" color="secondary" variant="h4">
            Перевозчик
          </Typography>
        </Tooltip>
      </Stacks>
      <Stacks gap={32} direction="row">
        <Stacks direction="column">
          <Stacks gap={4} alignItems="flex-end">
            <Typography variant="h1" weight={600} color="primary-second">
              {activeWay?.[direction]?.from.time}
            </Typography>
            <Typography variant="h3" weight={600} color="primary">
              {activeWay?.[direction]?.from.date}
            </Typography>
          </Stacks>
          <Stacks direction="column">
            <Typography variant="h3" color="secondary">
              {activeWay?.[direction]?.from.city} - {activeWay?.[direction]?.from.station}
            </Typography>
            <Typography variant="h3" color="secondary">
              {activeWay?.[direction]?.from.street}, {activeWay?.[direction]?.from.house}
            </Typography>
          </Stacks>
        </Stacks>
        <Stacks direction="column">
          <Stacks gap={4} alignItems="flex-end">
            <Typography variant="h1" weight={600} color="primary-second">
              {activeWay?.[direction]?.to.time}
            </Typography>
            <Typography variant="h3" weight={600} color="primary">
              {activeWay?.[direction]?.to.date}
            </Typography>
          </Stacks>
          <Stacks direction="column">
            <Typography variant="h3" color="secondary">
              {activeWay?.[direction]?.to.city} - {activeWay?.[direction]?.to.station}
            </Typography>
            <Typography variant="h3" color="secondary">
              {activeWay?.[direction]?.to.street}, {activeWay?.[direction]?.to.house}
            </Typography>
          </Stacks>
        </Stacks>
      </Stacks>
      {(activeWay?.[direction]?.seatsSelected || []).length > 0 && (
        <Typography
          onClick={() => setVisible(!visible)}
          cursor="pointer"
          variant="h4"
          weight={500}
          color="secondary"
        >
          Детали рейса
        </Typography>
      )}
    </Stacks>
  );
};
