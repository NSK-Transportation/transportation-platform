import { useMount } from "@siberiacancode/reactuse";
import { useNavigate } from "react-router-dom";
import { PassengerCard, SelectorReturnWayPassenger } from "@/widgets/Passenger";
import { PaymentTicket } from "@/widgets/Payment";
import { SelectorSeat } from "@/widgets/Seat";
import { SelectorWayForSaleTicket, WayDetailList } from "@/widgets/Way";
import { StepperButtons } from "@/features/step";
import { usePassengerStore } from "@/entities/passenger";
import { useWayStore } from "@/entities/way";
import { Stacks, Stepper } from "@/shared/ui";
import { useSaleTicketSteps } from "../model/hooks/useSaleTicketSteps";

export const StepContent = () => {
  const { returnHave } = useWayStore();
  const { passengers } = usePassengerStore();
  const navigate = useNavigate();

  const { handleNextStep, handlePrevStep, isFirstStep, isLastStep, activeStep, steps } =
    useSaleTicketSteps();

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

  const stepContent = () => {
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

  const step = stepContent();

  return (
    <Stacks direction="column" gap={16}>
      <Stepper direction="row" activeStep={activeStep} steps={steps} />
      {step}
      <StepperButtons
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </Stacks>
  );
};
