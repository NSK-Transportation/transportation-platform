import { Box, Stacks} from "@/shared/ui";
import { SeatInfoPrice } from "./seatInfoPrice/SeatInfoPrice";
import { SeatInfoWay } from "./seatInfoWay/SeatInfoWay";
import { SeatInfoPlace } from "./seatInfoPlace/SeatInfoPlace";

export const SeatInfoItem = () => {
  return (
    <Stacks direction="column">
        <SeatInfoWay/>
        <SeatInfoPrice/>
    </Stacks>
  );
};
