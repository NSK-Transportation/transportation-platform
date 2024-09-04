import { Box, Stacks } from "@/shared/ui";
import { SeatInfoPrice } from "./seatInfoPrice/SeatInfoPrice";
import { SeatInfoWay } from "./seatInfoWay/SeatInfoWay";
import { SeatInfoPlace } from "./seatInfoPlace/SeatInfoPlace";
import { useState } from "react";

export const SeatInfoItem = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Stacks direction="column">
      <Box border="up">
        <Stacks direction="column" gap={8}>
          <SeatInfoWay direction="there" visible={visible} setVisible={setVisible} />
          <Stacks direction="column" gap={8}>
            {visible && <SeatInfoPlace />}
          </Stacks>
        </Stacks>
      </Box>
      <Box direction="down" border="down" color="blue">
        <SeatInfoPrice />
      </Box>
    </Stacks>
  );
};
