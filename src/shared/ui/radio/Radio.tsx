import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Radio.module.scss";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  direction?: "row" | "column";
  label: string;
  disabled?: boolean;
  checked?: boolean;
  name?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, disabled, checked, name, direction = "row", label, ...props }, ref) => (
    <label
      className={clsx(styles.radio, className, {
        [styles[direction]]: direction,
        [styles.disabled]: disabled,
      })}
    >
      <input checked={checked} disabled={disabled} type="radio" ref={ref} {...props} />
      {label}
    </label>
  ),
);

Radio.displayName = "Radio";

export { Radio };
