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
}

export const useStepper = ({ initialStep = 1, steps }: UseStepper): UseStepperReturn => {
  const visibleSteps = steps.filter((step) => step.visible !== false);
  const [activeStep, setActiveStep] = useState(
    Math.max(0, Math.min(initialStep, visibleSteps.length - 1)),
  );

  const changeStep = useCallback(
    (delta: number) => {
      setActiveStep((prev) => {
        const newIndex = Math.max(0, Math.min(prev + delta, visibleSteps.length - 1));
        return visibleSteps[newIndex] ? newIndex : prev;
      });
    },
    [visibleSteps.length],
  );

  return {
    activeStep,
    nextStep: () => changeStep(1),
    prevStep: () => changeStep(-1),
    goToStep: (step: number) => setActiveStep(step),
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === visibleSteps.length - 1,
  };
};
