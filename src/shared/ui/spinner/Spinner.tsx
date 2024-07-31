import { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Spinner.module.scss";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium";
  className?: string;
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "small", className, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.spinner, styles[size], className)} {...props} />
  ),
);

Spinner.displayName = "Spinner";

export { Spinner };
