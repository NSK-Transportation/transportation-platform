import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Radio.module.scss";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  direction?: "row" | "column";
  label: string;
  disabled?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, disabled, direction = "row", label, ...props }, ref) => (
    <label
      className={clsx(styles.radio, className, {
        [styles[direction]]: direction,
        [styles.disabled]: disabled,
      })}
    >
      <input disabled={disabled} type="radio" ref={ref} {...props} />
      {label}
    </label>
  ),
);

Radio.displayName = "Radio";

export { Radio };
