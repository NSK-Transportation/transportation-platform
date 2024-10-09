import { StepperButtons } from "@/features/step";
import { Stacks, Stepper } from "@/shared/ui";
import { StepContent } from "../lib/data/StepContent";
import { useSaleTicketSteps } from "../model/hooks/useSaleTicketSteps";

export const SaleTicket = () => {
  const { activeStep, steps } = useSaleTicketSteps();
  const { handleNextStep, handlePrevStep, isFirstStep, isLastStep } = useSaleTicketSteps();

  return (
    <Stacks gap={16} direction="column" fullheight>
      <Stepper direction="row" activeStep={activeStep} steps={steps} />

      <StepContent activeStep={activeStep} />

      <StepperButtons
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </Stacks>
  );
};
