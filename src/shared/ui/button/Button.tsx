import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export interface ButtonProps {
  className?: string;
  variant?: "default" | "primary" | "secondary" | "link" | "danger";
  size?: "small" | "medium" | "large" | "s48" | "icon";
  label: string;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, label, ...props }, ref) => (
    <button
      className={clsx(styles.button, variant && styles[variant], size && styles[size], className)}
      ref={ref}
      {...props}
    >
      {label}
    </button>
  ),
);

Button.displayName = "Button";

export { Button };
