import { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Chip.module.scss";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "info" | "success" | "error" | "warning";
  size?: "small" | "medium" | "large";
  label: string;
  //   startIcon?: ReactNode;
  //   endIcon?: ReactNode;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "info", size = "medium", label, ...props }, ref) => (
    <div
      className={clsx(styles.chip, className, {
        [styles[size]]: size,
        [styles[variant]]: variant,
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
