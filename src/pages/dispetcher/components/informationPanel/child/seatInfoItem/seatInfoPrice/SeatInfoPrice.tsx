import { Stacks, Typography } from "@/shared/ui";
import { useInformationStore } from "../../../InformationPanel.store";
import { getSumValues } from "@/shared/utils";

export const SeatInfoPrice = () => {
  const { activeWay } = useInformationStore();

  const sum = getSumValues(activeWay.there?.ticket.price, activeWay.return?.ticket.price);

  return (
    <Stacks direction="row" gap={4}>
      <Typography variant="h1" color="default-white">
        {sum} руб
      </Typography>
    </Stacks>
  );
};
