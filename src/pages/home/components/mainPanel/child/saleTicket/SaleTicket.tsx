/**
 * Блок - Кассир
 * Элемент - Продажа билетов
 */

import { useSearchParams } from "react-router-dom";
import { useMainStore } from "../../MainPanel.store";
import { Box, Button, Checkbox, Stacks, Step, Stepper, Typography } from "@/shared/ui";
import { useStepper } from "@/shared/hooks";
import { BusIcon, PaymentIcon, ReturnIcon, SeatIcon, UserIcon } from "@/shared/assets";
import { WayMenu, WayMainList, SeatMainItem, PassengerInfoItem, WayPayment } from "./index";

export const SaleTicket = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "0";

  const {
    saleTicket: { activeWay, way, wayDetails, passengers },
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
    if (activeStep === 0 && !activeWay) {
      alert("Выберите маршрут");
      return;
    } else if (activeStep === 1 && activeWay?.seatsSelected.length === 0) {
      alert("Выберите места");
      return;
    } else if (activeStep === 2 && passengers.some((p) => !p.ticket)) {
      alert("Заполните данные пассажира");
      return;
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
            {way && wayDetails?.to?.length > 0 && <WayMainList data={wayDetails?.to} />}
          </>
        );
      case 1:
        return <SeatMainItem />;
      case 2:
        return <PassengerInfoItem />;
      case 3:
        return way.returnHave ? (
          <>
            <Box>
              <Stacks direction="column" gap={16}>
                <Typography variant="h3">Обратный билет пассажира</Typography>
                {passengers.map((passenger) => (
                  <Stacks key={passenger.id} gap={8}>
                    <Checkbox
                      label={`${passenger.lastName} ${passenger.firstName} ${passenger.patronymic}`}
                    />
                    <Typography color="primary">{passenger?.ticket?.rus}</Typography>
                  </Stacks>
                ))}
              </Stacks>
            </Box>
            <WayMenu returnWay />
            {way.returnHave && wayDetails?.return?.length > 0 && (
              <WayMainList data={wayDetails?.return} />
            )}
          </>
        ) : (
          <WayPayment />
        );
      default:
        return null;
    }
  };

  return (
    <Stacks gap={16} direction="column">
      <Stepper direction="row" activeStep={activeStep} steps={steps} />

      {getStepContent()}

      <Stacks gap={16} justifyContent="space-between">
        <Button variant="secondary" label="Назад" onClick={handlePrevStep} disabled={isFirstStep} />
        <Button variant="primary" label="Дальше" onClick={handleNextStep} disabled={isLastStep} />
      </Stacks>
    </Stacks>
  );
};
