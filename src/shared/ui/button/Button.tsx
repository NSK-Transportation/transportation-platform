import { forwardRef, ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "link" | "danger";
  size?: "small" | "medium" | "large" | "icon";
  justifyContent?: CSSProperties["justifyContent"];
  label: string | ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "medium",
      justifyContent,
      label,
      fullWidth,
      loading,
      ...props
    },
    ref,
  ) => (
    <button
      className={clsx(styles.button, className, {
        [styles.fullWidth]: fullWidth,
        [styles[size]]: size,
        [styles[variant]]: variant,
        [styles.loading]: loading,
      })}
      style={{
        justifyContent,
      }}
      ref={ref}
      {...props}
    >
      {label}
    </button>
  ),
);

Button.displayName = "Button";

export { Button };
