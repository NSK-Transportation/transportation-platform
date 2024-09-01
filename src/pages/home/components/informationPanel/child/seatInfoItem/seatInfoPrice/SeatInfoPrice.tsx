import { useMainStore } from "@/pages/home/components/mainPanel/MainPanel.store";
import { Stacks, Typography } from "@/shared/ui";

export const SeatInfoPrice = () => {
  const { activeWay } = useMainStore((state) => state.saleTicket);

  return (
    <Stacks direction="row" gap={4}>
      <Typography variant="h1" color="default-white">
        {activeWay?.there?.price} руб
      </Typography>
    </Stacks>
  );
};
