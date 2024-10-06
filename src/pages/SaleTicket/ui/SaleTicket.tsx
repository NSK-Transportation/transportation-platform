import { useSearchParams } from "react-router-dom";
import { PassengerCard, SelectorReturnWayPassenger } from "@/widgets/Passenger";
import { PaymentTicket } from "@/widgets/Payment";
import { SelectorSeat } from "@/widgets/Seat";
import { SelectorWayForSaleTicket, WayDetailList } from "@/widgets/Way";
import { useWayStore } from "@/entities/way";
import { BusIcon, PaymentIcon, ReturnIcon, SeatIcon, UserIcon } from "@/shared/assets";
import { useStepper } from "@/shared/hooks";
import { Button, Stacks, Step, Stepper } from "@/shared/ui";

// TODO: Убрать всю логику на слой ниже

export const SaleTicket = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 0;
  const { returnHave } = useWayStore();

  const steps: Step[] = [
    { icon: <BusIcon /> },
    { icon: <SeatIcon /> },
    { icon: <UserIcon /> },
    { icon: <ReturnIcon />, visible: Boolean(returnHave) },
    { icon: <SeatIcon />, visible: Boolean(returnHave) },
    { icon: <UserIcon />, visible: Boolean(returnHave) },
    { icon: <PaymentIcon /> },
  ];

  const { activeStep, nextStep, prevStep, isFirstStep, isLastStep } = useStepper({
    initialStep: step,
    steps,
  });

  const handleNextStep = () => {
    setSearchParams({ step: String(activeStep + 1) });
    nextStep();
  };

  const handlePrevStep = () => {
    setSearchParams({ step: String(activeStep - 1) });
    prevStep();
  };

  const getStepContent = () => {
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

  return (
    <Stacks gap={16} direction="column" fullheight>
      <Stepper direction="row" activeStep={activeStep} steps={steps} />

      {getStepContent()}

      <Stacks gap={16} justifyContent="space-between">
        <Button variant="secondary" label="Назад" onClick={handlePrevStep} disabled={isFirstStep} />
        <Button variant="primary" label="Дальше" onClick={handleNextStep} disabled={isLastStep} />
      </Stacks>
    </Stacks>
  );
};
