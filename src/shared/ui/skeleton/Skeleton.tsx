import clsx from "clsx";
import { forwardRef, HTMLAttributes } from "react";
import styles from "./Skeleton.module.scss";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  shape?: "circle" | "rectangle";
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, shape = "rectangle", ...props }, ref) => (
    <div
      className={clsx(styles.skeleton, className, {
        [styles.circle]: shape === "circle",
        [styles.rectangle]: shape === "rectangle",
      })}
      style={{ width, height }}
      ref={ref}
      {...props}
    />
  ),
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
