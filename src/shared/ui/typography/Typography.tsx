import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Typography.module.scss";

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "span";
  color?:
    | "default-black"
    | "default-white"
    | "primary"
    | "primary-second"
    | "secondary"
    | "success"
    | "table-info"
    | "error"
    | "warning"
    | "info";
  align?: "left" | "center" | "right" | "justify";
  weight?: CSSProperties["fontWeight"];
  size?: CSSProperties["fontSize"];
  cursor?: CSSProperties["cursor"];
  line?: CSSProperties["textDecoration"];
  children: ReactNode;
  className?: string;
}

const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    {
      children,
      className,
      variant = "span",
      color = "default-black",
      align = "left",
      weight = "normal",
      size,
      cursor,
      line,
      ...props
    },
    ref,
  ) => {
    const Component = variant === "caption" ? "span" : variant;

    return (
      <Component
        ref={ref}
        className={clsx(styles.typography, className, {
          [styles[variant]]: variant,
          [styles[color]]: color,
        })}
        style={{
          textAlign: align,
          fontWeight: weight,
          fontSize: size,
          cursor: cursor,
          textDecoration: line,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

export { Typography };
