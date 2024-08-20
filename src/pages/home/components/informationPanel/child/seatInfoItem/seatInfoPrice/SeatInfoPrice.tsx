import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Box, Stacks, Typography } from "@/shared/ui";


export const SeatInfoPrice = () => {
  const { activeWay } = useMainStore((state) => state.saleTicket);
  return (
      <Box direction="center" border="down" color="blue">
      <Stacks direction="row" gap={3}>
        <Typography variant="caption" color="default-white" size={20}>
          {activeWay?.price}
        </Typography>
        <Typography variant="caption" color="default-white" size={20}>
          руб
        </Typography>
        </Stacks>
      </Box>
  );
};
