import { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Chip.module.scss";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "primary" | "info" | "success" | "error" | "warning" | "outline";
  size?: "small" | "medium" | "large" | "extra-large";
  selected?: boolean;
  label: string;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "default", size = "medium", selected, label, ...props }, ref) => (
    <div
      className={clsx(styles.chip, className, {
        [styles[size]]: size,
        [styles[variant]]: variant,
        [styles.selected]: selected,
      })}
      ref={ref}
      {...props}
    >
      <span className={styles.label}>{label}</span>
    </div>
  ),
);

Chip.displayName = "Chip";

export { Chip };
