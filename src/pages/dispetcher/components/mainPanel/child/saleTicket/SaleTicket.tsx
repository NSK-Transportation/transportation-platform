/**
 * Блок - Кассир
 * Элемент - Продажа билетов
 */

import { useSearchParams } from "react-router-dom";
import { Button, Stacks, Step, Stepper } from "@/shared/ui";
import { useStepper } from "@/shared/hooks";
import { BusIcon, PaymentIcon, ReturnIcon, SeatIcon, UserIcon } from "@/shared/assets";
import {
  WayMenu,
  WayMainList,
  SeatMainItem,
  PassengerInfoItem,
  WayPayment,
  ReturnInfoItem,
} from "./index";
import { useCallback, useMemo } from "react";
import { useSaleTicket } from "./SaleTicket.store";

export const SaleTicket = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 0;

  const { activeWay, way, wayDetail, passengers } = useSaleTicket();

  const steps: Step[] = useMemo(
    () => [
      { icon: <BusIcon /> },
      { icon: <SeatIcon /> },
      { icon: <UserIcon /> },
      { icon: <ReturnIcon />, visible: Boolean(way.returnHave) },
      { icon: <SeatIcon />, visible: Boolean(way.returnHave) },
      { icon: <UserIcon />, visible: Boolean(way.returnHave) },
      { icon: <PaymentIcon /> },
    ],
    [way.returnHave],
  );

  const { activeStep, nextStep, prevStep, isFirstStep, isLastStep } = useStepper({
    initialStep: step,
    steps,
  });

  const validateStep = useCallback(() => {
    if (activeStep === 0 && !activeWay.there) return "Выберите маршрут";
    if (activeStep === 1 && passengers.every((p) => !p.ticket.there?.seatId))
      return "Выберите места";
    if (activeStep === 2 && passengers.every((p) => !p.ticket.there?.type))
      // TODO: Изменить валидацию, на проверку всех полей
      return "Заполните данные пассажира";
    if (activeStep === 3 && way.returnHave && !activeWay.return) return "Выберите обратный рейс";
    if (activeStep === 3 && way.returnHave && passengers.every((p) => p.ticket.return === null))
      return "Выберите пассажира";
    if (activeStep === 4 && way.returnHave && passengers.every((p) => !p.ticket.return?.seatId))
      return "Выберите места на обратный рейс";
    if (activeStep === 5 && way.returnHave && passengers.every((p) => !p.ticket.return?.type))
      // TODO: Изменить валидацию, на проверку всех полей
      return "Заполните данные пассажира для обратного рейса";
    return null;
  }, [activeStep, activeWay, passengers, way, wayDetail]);

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

  const getStepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <WayMenu direction="there" />
            <WayMainList direction="there" />
          </>
        );
      case 1:
        return <SeatMainItem direction="there" />;
      case 2:
        return <PassengerInfoItem direction="there" />;
      case 3:
        return way.returnHave ? (
          <>
            <ReturnInfoItem />
            <WayMenu direction="return" />
            <WayMainList direction="return" />
          </>
        ) : (
          <WayPayment />
        );
      case 4:
        return way.returnHave && <SeatMainItem direction="return" />;
      case 5:
        return way.returnHave && <PassengerInfoItem direction="return" />;
      case 6:
        return <WayPayment />;
      default:
        return null;
    }
  }, [activeStep, way, wayDetail, passengers]);

  return (
    <Stacks gap={16} direction="column" fullheight>
      <Stepper direction="row" activeStep={activeStep} steps={steps} />

      {getStepContent}

      {activeWay.there && (
        <Stacks gap={16} justifyContent="space-between">
          <Button
            variant="secondary"
            label="Назад"
            onClick={handlePrevStep}
            disabled={isFirstStep}
          />
          <Button variant="primary" label="Дальше" onClick={handleNextStep} disabled={isLastStep} />
        </Stacks>
      )}
    </Stacks>
  );
};
