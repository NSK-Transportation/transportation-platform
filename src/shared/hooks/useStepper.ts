import { useState, useCallback } from "react";
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
  const initialStepClamped = Math.max(0, Math.min(initialStep, steps.length - 1));
  const [activeStep, setActiveStep] = useState(initialStepClamped);

  const nextStep = useCallback(() => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setActiveStep(step);
      }
    },
    [steps.length],
  );

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
