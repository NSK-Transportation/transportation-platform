import { useCallback } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { usePassengerStore } from "@/entities/passenger";
import { useWayStore } from "@/entities/way";
import { useWayDetailStore } from "@/entities/wayDetails";
import { BusIcon, PaymentIcon, ReturnIcon, SeatIcon, UserIcon } from "@/shared/assets";
import { useStepper } from "@/shared/hooks";

export const useSaleTicketSteps = () => {
  const { returnHave } = useWayStore();
  const { activeWay } = useWayDetailStore();
  const { passengers, formFullfield, setFormFullfield } = usePassengerStore();
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

  const validateStep = useCallback(() => {
    // Валидация маршрута
    if (activeStep === 0 && !activeWay.there) return "Выберите маршрут";

    // Валидация выбора мест
    if (activeStep === 1 && passengers.every((passenger) => !passenger.ticket.there?.seatId)) {
      return "Выберите места";
    }

    // Валидация данных пассажира
    if (activeStep === 2 && formFullfield === false) {
      return "Заполните данные пассажира";
    }

    setFormFullfield(false);

    // Валидация обратного маршрута
    if (activeStep === 3 && returnHave && !activeWay.return) {
      return "Выберите обратный рейс";
    }

    // Валидация выбора пассажира на обратный рейс
    if (
      activeStep === 3 &&
      returnHave &&
      passengers.every((passenger) => passenger.ticket.return === null)
    ) {
      return "Выберите пассажира на обратный рейс";
    }

    // Валидация мест на обратный рейс
    if (
      activeStep === 4 &&
      returnHave &&
      passengers.every((passenger) => !passenger.ticket.return?.seatId)
    ) {
      return "Выберите места на обратный рейс";
    }

    // Валидация данных пассажира на обратный рейс
    if (activeStep === 5 && formFullfield === false) {
      return "Заполните данные пассажира на обратный рейс";
    }

    return null;
  }, [
    activeStep,
    activeWay.there,
    activeWay.return,
    passengers,
    formFullfield,
    setFormFullfield,
    returnHave,
  ]);

  const handleNextStep = () => {
    const validationMessage = validateStep();
    if (validationMessage) {
      toast(validationMessage);
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
