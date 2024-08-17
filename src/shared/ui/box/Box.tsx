import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Box.module.scss";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "center";
  variant?: "default" | "dashed" | "solid";
  text?: string;
  fullWidth?: boolean;
  color?: "blue" | "white";
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      direction = "up",
      variant = "default",
      color = "white",
      children,
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
