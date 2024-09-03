import { useSaleTicket } from "@/pages/home/components/mainPanel";
import { Stacks, Typography } from "@/shared/ui";

export const SeatInfoPrice = () => {
  const { activeWay } = useSaleTicket();

  return (
    <Stacks direction="row" gap={4}>
      <Typography variant="h1" color="default-white">
        {activeWay?.there?.price} руб
      </Typography>
    </Stacks>
  );
};
