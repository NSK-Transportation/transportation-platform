import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Switch.module.scss";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  direction?: "row" | "column";
  label: string;
  disabled?: boolean;
  checked?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, disabled, direction = "row", label, checked, ...props }, ref) => (
    <label
      className={clsx(styles.switch, className, {
        [styles[direction]]: direction,
        [styles.disabled]: disabled,
      })}
    >
      <input disabled={disabled} type="checkbox" checked={checked} ref={ref} {...props} />
      {label}
    </label>
  ),
);

Switch.displayName = "Switch";

export { Switch };
