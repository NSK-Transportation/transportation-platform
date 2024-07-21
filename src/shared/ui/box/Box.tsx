import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Box.module.scss";

interface BoxProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  children1: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "center";
  text: string;
  size?: "small" | "medium" | "large";
  color?: "blue" | "white";
}

const Box = forwardRef<HTMLLabelElement, BoxProps>(
  ({ className, direction = "up", size = "small", color = "white", children,children1, text, ...props }, ref) => (
    <div
      className={clsx(styles.box, className, {
        [styles[direction]]: direction,
        [styles[size]]: size,
        [styles[color]]: color,
      })}
      {...props}
    >
      {children}
    </div>
  ),
);

Box.displayName = "Box";

export { Box };
