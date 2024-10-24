import { forwardRef, InputHTMLAttributes, ReactNode, useCallback, useRef } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "default" | "error" | "success" | "warning";
  slots?: ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", disabled, slots, fullWidth, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    return (
      <div
        className={clsx(styles.input, className, {
          [styles.fullWidth]: fullWidth,
          [styles[variant]]: variant,
          [styles.disabled]: disabled,
        })}
        onClick={handleDivClick}
        ref={ref}
      >
        <input ref={inputRef} disabled={disabled} {...props} />
        {slots && <div className={styles.input__slots}>{slots}</div>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
