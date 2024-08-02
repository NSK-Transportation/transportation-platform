import { forwardRef, LabelHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Label.module.scss";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  text: string;
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, direction = "up", children, text, required, ...props }, ref) => (
    <label
      className={clsx(styles.label, className, {
        [styles[direction]]: direction,
      })}
      ref={ref}
      {...props}
    >
      {text && (
        <span className={styles.label__text}>
          {text}
          {required && <span className={styles.required}>*</span>}
        </span>
      )}
      {children}
    </label>
  ),
);

Label.displayName = "Label";

export { Label };
