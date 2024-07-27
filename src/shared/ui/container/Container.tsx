import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Container.module.scss";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "xsm-768" | "sm-1200" | "md-1440" | "lg-1920" | "fullWidth";
  children: ReactNode;
  className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, variant = "md-1440", ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.container, className, {
        [styles[variant]]: variant,
      })}
      {...props}
    >
      {children}
    </div>
  ),
);

Container.displayName = "Container";

export { Container };
