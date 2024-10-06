import clsx from "clsx";
import { CSSProperties, forwardRef, InputHTMLAttributes, useEffect, useRef } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  direction?: "row" | "column";
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  alignSelf?: CSSProperties["alignSelf"];
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, disabled, direction = "row", label, indeterminate, alignSelf, ...props }, ref) => {
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
        style={{
          alignSelf: alignSelf,
        }}
      >
        <input disabled={disabled} type="checkbox" ref={resolvedRef} {...props} />
        {label}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
