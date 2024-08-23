import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Grid.module.scss";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: CSSProperties["gridTemplateColumns"] & CSSProperties["gridColumn"];
  rows?: CSSProperties["gridTemplateRows"] & CSSProperties["gridRow"];
  gap?: CSSProperties["gap"];
  alignItems?: CSSProperties["alignItems"];
  justifyItems?: CSSProperties["justifyItems"];
  area?: CSSProperties["gridArea"];
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
      columns,
      rows,
      gap = "10px",
      alignItems = "stretch",
      justifyItems = "stretch",
      area,
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
        gridArea: area,
        gridRow: rows,
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
