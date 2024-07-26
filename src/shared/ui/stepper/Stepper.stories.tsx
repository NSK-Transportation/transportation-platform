import { Meta, StoryFn } from "@storybook/react";
import { Stepper, Step, StepperProps } from "./Stepper";
import { FaCheck, FaInfoCircle, FaUser } from "react-icons/fa";
import { useStepper } from "@/shared/hooks/useStepper";
import { Stacks } from "../stacks/Stacks";
import { Button } from "../button/Button";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  argTypes: {
    direction: { control: "radio", options: ["row", "column"] },
    activeStep: { control: "number" },
    steps: { control: "object" },
    completedSteps: { control: "object" },
    className: { control: "text" },
  },
  args: {
    direction: "row",
    activeStep: 0,
    steps: [],
    completedSteps: [],
    fullwidth: false,
    fullheight: false,
    className: "",
  },
};

export default meta;

export const Default: StoryFn<StepperProps> = (args) => {
  const steps: Step[] = [{ icon: <FaUser /> }, { icon: <FaInfoCircle /> }, { icon: <FaCheck /> }];

  const { activeStep, nextStep, prevStep, isFirstStep, isLastStep } = useStepper({
    initialStep: 0,
    steps,
  });

  return (
    <Stacks gap={16} direction="y">
      <Stepper direction="row" activeStep={activeStep} steps={steps} />

      <p>
        <strong>Шаг {activeStep + 1}</strong>
      </p>

      <Stacks gap={16}>
        <Button
          variant="primary"
          label="Предыдущий"
          onClick={prevStep}
          disabled={isFirstStep}
          fullWidth
        />
        <Button
          fullWidth
          variant="primary"
          label="Далее"
          onClick={nextStep}
          disabled={isLastStep}
        />
      </Stacks>
    </Stacks>
  );
};
