import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Typography.module.scss";

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "span";
  color?: "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info";
  align?: "left" | "center" | "right" | "justify";
  children: ReactNode;
  className?: string;
}

const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, className, variant = "body", color = "default", align = "left", ...props }, ref) => {
    const Component = variant === "body" ? "span" : "caption" ? "span" : variant;

    return (
      <Component
        ref={ref}
        className={clsx(styles.typography, className, {
          [styles[variant]]: variant,
          [styles[color]]: color,
          [styles[align]]: align,
        })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

export { Typography };
