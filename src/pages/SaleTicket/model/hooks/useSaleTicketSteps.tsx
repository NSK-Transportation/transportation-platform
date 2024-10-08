import { useSearchParams } from "react-router-dom";
import { usePassengerStore } from "@/entities/passenger";
import { useWayStore } from "@/entities/way";
import { useWayDetailStore } from "@/entities/wayDetails";
import { BusIcon, PaymentIcon, ReturnIcon, SeatIcon, UserIcon } from "@/shared/assets";
import { useStepper } from "@/shared/hooks";

export const useSaleTicketSteps = () => {
  const { returnHave } = useWayStore();
  const { activeWay } = useWayDetailStore();
  const { passengers } = usePassengerStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 0;

  const steps = [
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

  const validateStep = () => {
    if (activeStep === 0 && !activeWay.there) return "Выберите маршрут";
    if (activeStep === 1 && passengers.every((p) => !p.ticket.there?.seatId))
      return "Выберите места";
    if (activeStep === 2 && passengers.every((p) => !p.ticket.there?.type))
      return "Заполните данные пассажира";
    if (activeStep === 3 && returnHave && !activeWay.return) return "Выберите обратный рейс";
    if (activeStep === 3 && returnHave && passengers.every((p) => p.ticket.return === null))
      return "Выберите пассажира";
    if (activeStep === 4 && returnHave && passengers.every((p) => !p.ticket.return?.seatId))
      return "Выберите места на обратный рейс";
    if (activeStep === 5 && returnHave && passengers.every((p) => !p.ticket.return?.type))
      return "Заполните данные пассажира для обратного рейса";
    return null;
  };

  const handleNextStep = () => {
    const validationMessage = validateStep();
    if (validationMessage) {
      alert(validationMessage);
      return;
    }
    setSearchParams({ step: String(activeStep + 1) });
    nextStep();
  };

  const handlePrevStep = () => {
    setSearchParams({ step: String(activeStep - 1) });
    prevStep();
  };

  return {
    activeStep: step,
    steps,
    handleNextStep,
    handlePrevStep,
    isFirstStep,
    isLastStep,
  };
};
