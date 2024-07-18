// Divider.tsx
import { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Divider.module.scss";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = "horizontal", className }) => (
    <div className={clsx(styles.divider, styles[orientation], className)} />
  ),
);

Divider.displayName = "Divider";

export { Divider };
