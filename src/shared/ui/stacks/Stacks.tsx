import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Stacks.module.scss";

export interface StacksProps extends HTMLAttributes<HTMLDivElement> {
  gap?: CSSProperties["gap"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  direction?: "x" | "y";
  fullwidth?: boolean;
  fullheight?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Stacks = forwardRef<HTMLDivElement, StacksProps>(
  (
    {
      gap,
      alignItems,
      justifyContent,
      direction = "x",
      fullwidth,
      fullheight,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={clsx(styles.stacks, className, {
        [styles[direction]]: direction,
        [styles.fullwidth]: fullwidth,
        [styles.fullheight]: fullheight,
      })}
      style={{
        gap,
        alignItems,
        justifyContent,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  ),
);

Stacks.displayName = "Stacks";

export { Stacks };
