import { forwardRef, ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Alert.module.scss";
import { AlertIcon } from "@/shared/assets";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "error" | "success" | "warning";
  icon?: ReactNode;
  label: string | ReactNode;
  fullWidth?: boolean;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", icon = <AlertIcon />, label, fullWidth, ...props }, ref) => {
    return (
      <div
        className={clsx(styles.alert, {
          [styles[variant]]: variant,
          [styles.fullWidth]: fullWidth,
        })}
        ref={ref}
        {...props}
      >
        {icon && <div className={styles.alert__icon}>{icon}</div>}
        {label}
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert };
