import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Box, Stacks, Typography } from "@/shared/ui";
import { SeatInfoPlace } from "../seatInfoPlace/SeatInfoPlace";

export const SeatInfoWay = () => {
  const { activeWay } = useMainStore((state) => state.saleTicket);
  return (
    <Box border="up">
      <Stacks gap={8} direction="column" fullwidth>
        <Stacks gap={4} direction="row" justifyContent="space-between">
          <Stacks gap={4} direction="row">
            <Typography variant="h3">Рейс №{activeWay?.wayNumber}</Typography>
            <Typography variant="h3">
              {activeWay?.from.city} - {activeWay?.to.city}
            </Typography>
          </Stacks>
          <Typography color="secondary" variant="h4">
            Перевозчик:
          </Typography>
        </Stacks>
        <Stacks gap={33} direction="row">
          <Stacks direction="column">
            <Stacks direction="column">
              <Typography variant="h1" weight={600} color="primary-second">
                {activeWay?.from.time}
              </Typography>
            </Stacks>
            <Stacks direction="column">
              <Typography variant="h3" color="secondary">
                {activeWay?.from.city} - {activeWay?.from.station}
              </Typography>
              <Typography variant="h3" color="secondary">
                {activeWay?.from.street}, {activeWay?.from.house}
              </Typography>
            </Stacks>
          </Stacks>
          <Stacks direction="column">
            <Typography variant="h1" weight={600} color="primary-second">
              {activeWay?.to.time}
            </Typography>
            <Stacks direction="column">
              <Typography variant="h3" color="secondary">
                {activeWay?.to.city} - {activeWay?.to.station}
              </Typography>
              <Typography variant="h3" color="secondary">
                {activeWay?.to.street}, {activeWay?.to.house}
              </Typography>
            </Stacks>
          </Stacks>
        </Stacks>
        <Typography variant="h4" weight={500} color="secondary">
          Детали рейса
        </Typography>
        <SeatInfoPlace/>
      </Stacks>
    </Box>
  );
};
