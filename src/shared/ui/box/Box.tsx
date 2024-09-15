import { CSSProperties, forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Box.module.scss";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "center";
  variant?: "default" | "dashed" | "solid" | "withoutShadow";
  border?: "right" | "left" | "down" | "up" | "default";
  padding?: boolean | number | [number, number, number, number];
  cursor?: CSSProperties["cursor"];
  overflow?: CSSProperties["overflow"];
  hover?: boolean;
  disabled?: boolean;
  text?: string;
  fullWidth?: boolean;
  color?: "blue" | "white";
  style?: CSSProperties;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      direction = "left",
      variant = "default",
      color = "white",
      children,
      border = "default",
      padding = true,
      cursor,
      overflow,
      hover = false,
      disabled = false,
      text,
      fullWidth,
      style,
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
        [styles[`border-${border}`]]: border,
        [styles.fullWidth]: fullWidth,
        [styles.hover]: hover,
        [styles.disabled]: disabled,
      })}
      style={{
        padding: Array.isArray(padding)
          ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
          : typeof padding === "boolean"
            ? padding
              ? "16px"
              : "0px"
            : `${padding}px`,
        cursor: cursor,
        overflow: overflow,
        ...style,
      }}
      {...props}
    >
      {text && <span className={styles.box__text}>{text}</span>}
      {children}
    </div>
  ),
);

Box.displayName = "Box";

export { Box };
