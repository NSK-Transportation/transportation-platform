import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "primary" | "secondary" | "link" | "danger";
  size?: "small" | "medium" | "large" | "s36" | "icon";
  label: string | ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "medium", label, fullWidth, loading, ...props },
    ref,
  ) => (
    <button
      className={clsx(styles.button, className, {
        [styles.fullWidth]: fullWidth,
        [styles[size]]: size,
        [styles[variant]]: variant,
        [styles.loading]: loading,
      })}
      ref={ref}
      {...props}
    >
      {label}
    </button>
  ),
);

Button.displayName = "Button";

export { Button };
