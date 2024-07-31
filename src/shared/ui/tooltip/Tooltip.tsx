import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Tooltip.module.scss";

export interface TooltipProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  text: string;
}

const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  ({ className, direction = "up", children, text, ...props }) => (
    <div
      className={clsx(styles.tooltip, className, {
        [styles[direction]]: direction,
      })}
      {...props}
    >
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  ),
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
