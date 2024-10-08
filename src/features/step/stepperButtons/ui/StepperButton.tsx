import { FC } from "react";
import { Button, Stacks } from "@/shared/ui";

interface Props {
  handlePrevStep: () => void;
  handleNextStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const StepperButtons: FC<Props> = ({
  handlePrevStep,
  handleNextStep,
  isFirstStep,
  isLastStep,
}) => (
  <Stacks gap={16} justifyContent="space-between">
    <Button variant="secondary" label="Назад" onClick={handlePrevStep} disabled={isFirstStep} />
    <Button variant="primary" label="Дальше" onClick={handleNextStep} disabled={isLastStep} />
  </Stacks>
);
