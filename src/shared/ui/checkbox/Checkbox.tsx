import { forwardRef, InputHTMLAttributes, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  direction?: "row" | "column";
  label: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, disabled, direction = "row", label, indeterminate, ...props }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (resolvedRef && typeof resolvedRef !== "function" && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <label
        className={clsx(styles.checkbox, className, {
          [styles.indeterminate]: indeterminate,
          [styles[direction]]: direction,
          [styles.disabled]: disabled,
        })}
      >
        <input disabled={disabled} type="checkbox" ref={resolvedRef} {...props} />
        {label}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
