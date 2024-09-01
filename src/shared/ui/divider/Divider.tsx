import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Divider.module.scss";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  color?: "default" | "blue";
  width?: CSSProperties["borderWidth"];
  className?: string;
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = "horizontal", color = "default", width, className }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.divider, className, {
        [styles[color]]: color,
        [styles[orientation]]: orientation,
      })}
      style={{
        borderWidth: width,
      }}
    />
  ),
);

Divider.displayName = "Divider";

export { Divider };
