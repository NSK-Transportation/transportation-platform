import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Box, Stacks, Typography } from "@/shared/ui";

export const SeatInfoPrice = () => {
  const { activeWay } = useMainStore((state) => state.saleTicket);
  return (
    <Box direction="down" border="down" color="blue">
      <Stacks direction="row" gap={4}>
        <Typography variant="h1" color="default-white">
          {activeWay?.price} руб
        </Typography>
      </Stacks>
    </Box>
  );
};
