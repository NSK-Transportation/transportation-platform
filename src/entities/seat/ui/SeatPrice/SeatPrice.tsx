import { Stacks, Typography } from "@/shared/ui";
import { getSumValues } from "@/shared/utils";

interface Props {
  activeWay: any;
}

export const SeatPrice = ({ activeWay }: Props) => {
  const sum = getSumValues(activeWay.there?.ticket.price, activeWay.return?.ticket.price);

  return (
    <Stacks direction="row" gap={4}>
      <Typography variant="h1" color="default-white">
        {sum} руб
      </Typography>
    </Stacks>
  );
};
