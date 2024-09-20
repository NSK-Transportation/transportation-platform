import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Chip.module.scss";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?:
    | "default"
    | "primary"
    | "info"
    | "success"
    | "error"
    | "warning"
    | "outline-blue"
    | "outline-orange";
  size?: "small" | "medium" | "large" | "extra-large";
  hover?: boolean;
  cursor?: CSSProperties["cursor"];
  selected?: boolean;
  label: string | ReactNode;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    { className, variant = "default", size = "medium", hover, cursor, selected, label, ...props },
    ref,
  ) => (
    <div
      className={clsx(styles.chip, className, {
        [styles[size]]: size,
        [styles[variant]]: variant,
        [styles.selected]: selected,
        [styles.hover]: hover,
      })}
      style={{
        cursor: cursor,
      }}
      ref={ref}
      {...props}
    >
      <span className={styles.label}>{label}</span>
    </div>
  ),
);

Chip.displayName = "Chip";

export { Chip };
