import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Grid.module.scss";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: CSSProperties["gridTemplateColumns"];
  rows?: CSSProperties["gridTemplateRows"];
  gap?: CSSProperties["gap"];
  alignItems?: CSSProperties["alignItems"];
  justifyItems?: CSSProperties["justifyItems"];
  container?: boolean;
  fullwidth?: boolean;
  fullheight?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = "repeat(auto-fit, minmax(100px, 1fr))",
      rows,
      gap = "10px",
      alignItems = "stretch",
      justifyItems = "stretch",
      container = false,
      fullwidth = false,
      fullheight = false,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={clsx(
        styles.grid,
        {
          [styles.container]: container,
          [styles.fullWidth]: fullwidth,
          [styles.fullHeight]: fullheight,
        },
        className,
      )}
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap,
        alignItems,
        justifyItems,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);

Grid.displayName = "Grid";

export { Grid };
