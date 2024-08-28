import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Tooltip.module.scss";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  text: string;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, direction = "up", children, text, ...props }, ref) => (
    <div
      className={clsx(styles.tooltip, className, {
        [styles[direction]]: direction,
      })}
      {...props}
      ref={ref}
    >
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  ),
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
