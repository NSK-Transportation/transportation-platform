/**
 * Блок - Кассир
 * Элемент - Продажа билетов
 */

import { useSearchParams } from "react-router-dom";
import { WayMenu } from "./wayMenu/WayMenu";
import { Button, Stacks, Step, Stepper } from "@/shared/ui";
import { useStepper } from "@/shared/hooks";
import { BusIcon, PaymentIcon, ReturnIcon, SeatIcon, UserIcon } from "@/shared/assets/icons";
import { useMainStore } from "../../MainPanel.store";
import { WayMainList } from "./wayMainList/WayMainList";

export const SaleTicket = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";

  const {
    saleTicket: { returnWay, wayDetails },
  } = useMainStore();

  const steps: Step[] = [
    { icon: <BusIcon /> },
    { icon: <SeatIcon /> },
    { icon: <UserIcon /> },
    { icon: <ReturnIcon />, visible: returnWay.have },
    { icon: <PaymentIcon /> },
  ];

  const { activeStep, nextStep, prevStep, isFirstStep, isLastStep } = useStepper({
    initialStep: Number(step),
    steps,
  });

  const handleNextStep = () => {
    setSearchParams({
      step: String(activeStep + 1),
    });
    nextStep();
  };

  const handlePrevStep = () => {
    setSearchParams({
      step: String(activeStep - 1),
    });
    prevStep();
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <WayMenu />
            <WayMainList data={wayDetails} />
          </>
        );
      case 1:
        return "Выбор места";
      case 2:
        return "Данные пассажира";
      case 3:
        return returnWay.have ? "Обратный билет" : "Оплата";
      case 4:
        return "Оплата";
      default:
        return null;
    }
  };

  return (
    <Stacks
      style={{
        height: "100%",
      }}
      gap={16}
      direction="column"
    >
      <Stepper direction="row" activeStep={activeStep} steps={steps} />

      {getStepContent()}

      <Stacks gap={16} justifyContent="space-between">
        <Button variant="secondary" label="Назад" onClick={handlePrevStep} disabled={isFirstStep} />
        <Button variant="primary" label="Дальше" onClick={handleNextStep} disabled={isLastStep} />
      </Stacks>
    </Stacks>
  );
};
