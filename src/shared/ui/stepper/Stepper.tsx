import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Stepper.module.scss";

export interface Step {
  icon: ReactNode;
  visible?: boolean;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  fullwidth?: boolean;
  fullheight?: boolean;
  activeStep?: number;
  completedSteps?: number[];
  steps: Step[];
  className?: string;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    { direction = "row", fullwidth, fullheight, activeStep = 0, steps, className, ...props },
    ref,
  ) => {
    const visibleSteps = steps.filter((step) => step.visible !== false);

    return (
      <div
        ref={ref}
        className={clsx(styles.stepper, className, {
          [styles[direction]]: direction,
          [styles.fullwidth]: fullwidth,
          [styles.fullheight]: fullheight,
        })}
        {...props}
      >
        {visibleSteps.map((step, index) => (
          <div
            key={index}
            className={clsx(styles.stepper__step, {
              [styles.stepper__active]: index === activeStep,
              [styles.stepper__completed]: index < activeStep,
            })}
          >
            <div className={styles.stepper__icon}>{step.icon}</div>
            {index < visibleSteps.length - 1 && (
              <hr
                className={clsx(styles.stepper__line, {
                  [styles.stepper__active]: index === activeStep,
                  [styles.stepper__completed]: index < activeStep,
                })}
              />
            )}
          </div>
        ))}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";

export { Stepper };
