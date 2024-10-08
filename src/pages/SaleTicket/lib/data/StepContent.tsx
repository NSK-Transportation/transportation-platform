import { useMount } from "@siberiacancode/reactuse";
import { useNavigate } from "react-router-dom";
import { PassengerCard, SelectorReturnWayPassenger } from "@/widgets/Passenger";
import { PaymentTicket } from "@/widgets/Payment";
import { SelectorSeat } from "@/widgets/Seat";
import { SelectorWayForSaleTicket, WayDetailList } from "@/widgets/Way";
import { usePassengerStore } from "@/entities/passenger";
import { useWayStore } from "@/entities/way";

export const StepContent = ({ activeStep }: { activeStep: number }) => {
  const { returnHave } = useWayStore();
  const { passengers } = usePassengerStore();
  const navigate = useNavigate();

  useMount(() => {
    if (!passengers[0]) {
      navigate(
        {
          pathname: "/home/sale-ticket",
          search: "?step=0",
        },
        { replace: true },
      );
    }
  });

  switch (activeStep) {
    case 0:
      return (
        <>
          <SelectorWayForSaleTicket direction="there" />
          <WayDetailList direction="there" />
        </>
      );
    case 1:
      return <SelectorSeat direction="there" />;
    case 2:
      return <PassengerCard direction="there" />;
    case 3:
      return returnHave ? (
        <>
          <SelectorReturnWayPassenger />
          <SelectorWayForSaleTicket direction="return" />
          <WayDetailList direction="return" />
        </>
      ) : (
        <PaymentTicket />
      );
    case 4:
      return returnHave && <SelectorSeat direction="return" />;
    case 5:
      return returnHave && <PassengerCard direction="return" />;
    case 6:
      return <PaymentTicket />;
    default:
      return null;
  }
};
