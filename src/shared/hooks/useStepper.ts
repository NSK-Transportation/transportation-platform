import { useState } from "react";
import { type Step } from "@/shared/ui";

interface UseStepper {
  initialStep?: number;
  steps: Step[];
}

interface UseStepperReturn {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  steps: Step[];
}

export const useStepper = ({ initialStep = 0, steps }: UseStepper): UseStepperReturn => {
  const [activeStep, setActiveStep] = useState(initialStep);

  const nextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setActiveStep(step);
    }
  };

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  return {
    activeStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
    steps,
  };
};
