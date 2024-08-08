/**
 * Блок - Кассир
 * Элемент - Продажа билетов
 */

import { useSearchParams } from "react-router-dom";
import { WayMenu } from "./wayMenu/WayMenu";
import { Button, Divider, Stacks, Step, Stepper } from "@/shared/ui";
import { useStepper } from "@/shared/hooks";
import { BusIcon, PaymentIcon, ReturnIcon, SeatIcon, UserIcon } from "@/shared/assets/icons";
import { useMainStore } from "../../MainPanel.store";
import { WayMainList } from "./wayMainList/WayMainList";
import { SeatMainItem } from "./seatMainItem/SeatMainItem";

export const SaleTicket = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";

  const {
    saleTicket: { activeWay, way, wayDetails },
  } = useMainStore();

  const steps: Step[] = [
    { icon: <BusIcon /> },
    { icon: <SeatIcon /> },
    { icon: <UserIcon /> },
    { icon: <ReturnIcon />, visible: Boolean(way.returnHave) },
    { icon: <PaymentIcon /> },
  ];

  const { activeStep, nextStep, prevStep, isFirstStep, isLastStep } = useStepper({
    initialStep: Number(step),
    steps,
  });

  const handleNextStep = () => {
    if (!activeWay) {
      alert("Выберите маршрут");
    } else {
      setSearchParams({
        step: String(activeStep + 1),
      });
      nextStep();
    }
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
        return <SeatMainItem />;
      case 2:
        return "Данные пассажира";
      case 3:
        return way.returnHave ? <WayMenu returnWay /> : "Оплата";
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
