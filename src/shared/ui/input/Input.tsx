import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "default" | "error" | "success" | "warning";
  border?: boolean;
  wrapper?: "default" | "blue";
  slots?: ReactNode;
  pointer?: boolean;
  fullWidth?: boolean;
  onWrapperClick?: () => void;
  message?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      border = true,
      wrapper = "default",
      disabled,
      slots,
      pointer,
      fullWidth,
      onWrapperClick,
      message,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleDivClick = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (onWrapperClick) {
        onWrapperClick();
      }
    }, [onWrapperClick]);

    return (
      <div
        className={clsx(styles.input, className, {
          [styles.fullWidth]: fullWidth,
          [styles[variant]]: variant,
          [styles.disabled]: disabled,
          [styles.border]: border,
          [styles[wrapper]]: wrapper,
        })}
        onClick={handleDivClick}
      >
        <input ref={inputRef} disabled={disabled} {...props} />
        {message && <div className={styles.input__message}>{message}</div>}
        {slots && (
          <div
            className={clsx(styles.input__slots, {
              [styles.input__slots__pointer]: pointer,
            })}
          >
            {slots}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
