import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  direction?: "row" | "column";
  label: string;
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, disabled, direction = "row", label, ...props }, ref) => (
    <label
      className={clsx(styles.checkbox, className, {
        [styles[direction]]: direction,
        [styles.disabled]: disabled,
      })}
    >
      <input disabled={disabled} type="checkbox" ref={ref} {...props} />
      {label}
    </label>
  ),
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
