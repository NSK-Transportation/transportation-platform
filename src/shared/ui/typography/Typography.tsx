import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Typography.module.scss";

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "h1" | "h2" | "h3" | "body" | "caption";
  color?: "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info";
  align?: "left" | "center" | "right" | "justify";
  children: ReactNode;
  className?: string;
}

const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, className, variant = "body", color = "default", align = "left", ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.typography, className, {
        [styles[variant]]: variant,
        [styles[color]]: color,
        [styles[align]]: align,
      })}
      {...props}
    >
      {children}
    </div>
  ),
);

Typography.displayName = "Typography";

export { Typography };
