import { Stacks } from "@/shared/ui";
import { SeatInfoPrice } from "./seatInfoPrice/SeatInfoPrice";
import { SeatInfoWay } from "./seatInfoWay/SeatInfoWay";
import { useMainStore } from "../../../mainPanel/MainPanel.store";
import { useSearchParams } from "react-router-dom";

export const SeatInfoItem = () => {
  const { activeWay } = useMainStore((state) => state.saleTicket);
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";

  return (
    <Stacks direction="column">
      <SeatInfoWay direction="to" />
      {step >= "3" && activeWay.return && <SeatInfoWay direction="return" />}
      <SeatInfoPrice />
    </Stacks>
  );
};
