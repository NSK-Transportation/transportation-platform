import { forwardRef, ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "link"
    | "danger"
    // Для SeatMainItem компонента //
    | "free"
    | "selected"
    | "booking"
    | "occupied"
    // Для WayPayment компонента //
    | "payment";
  size?: "small" | "medium" | "large" | "icon";
  sizeIcon?: string | number;
  justifyContent?: CSSProperties["justifyContent"];
  label: string | ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      sizeIcon,
      justifyContent,
      label,
      fullWidth,
      loading,
      ...props
    },
    ref,
  ) => {
    const iconSizeStyle =
      size === "icon" && sizeIcon
        ? {
            width: typeof sizeIcon === "number" ? `${sizeIcon}px` : sizeIcon,
            height: typeof sizeIcon === "number" ? `${sizeIcon}px` : sizeIcon,
            fontSize: typeof sizeIcon === "number" ? `${sizeIcon / 2}px` : `calc(${sizeIcon} / 2)`,
          }
        : {};

    return (
      <button
        className={clsx(styles.button, className, {
          [styles.fullWidth]: fullWidth,
          [styles[size]]: size,
          [styles[variant]]: variant,
          [styles.loading]: loading,
        })}
        style={{
          justifyContent,
          ...iconSizeStyle,
        }}
        ref={ref}
        {...props}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
