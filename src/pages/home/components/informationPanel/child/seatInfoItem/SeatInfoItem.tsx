import { Stacks } from "@/shared/ui";
import { SeatInfoPrice } from "./seatInfoPrice/SeatInfoPrice";
import { SeatInfoWay } from "./seatInfoWay/SeatInfoWay";

export const SeatInfoItem = () => {
  return (
    <Stacks direction="column">
      <SeatInfoWay />
      <SeatInfoPrice />
    </Stacks>
  );
};
