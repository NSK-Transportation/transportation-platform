import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Box.module.scss";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "center";
  variant?: "default" | "dashed" | "solid";
  border?: "right" | "left" | "down" | "up" | "default";
  text?: string;
  fullWidth?: boolean;
  color?: "blue" | "white";
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      direction = "left",
      variant = "default",
      color = "white",
      children,
      border = "default",
      text,
      fullWidth,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={clsx(styles.box, className, {
        [styles[direction]]: direction,
        [styles[variant]]: variant,
        [styles[color]]: color,
        [styles[`border-${border}`]]: border,
        [styles.fullWidth]: fullWidth,
      })}
      {...props}
    >
      {text && <span className={styles.box__text}>{text}</span>}
      {children}
    </div>
  ),
);

Box.displayName = "Box";

export { Box };
