import clsx from "clsx";
import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "default" | "error" | "success" | "warning";
  border?: boolean;
  wrapper?: "default" | "blue";
  slotsLeft?: ReactNode;
  slotsRight?: ReactNode;
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
      slotsLeft,
      slotsRight,
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

    useEffect(() => {
      if (message) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } else {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    }, [message]);

    return (
      <div
        className={clsx(styles.input, className, {
          [styles.fullWidth]: fullWidth,
          [styles[variant]]: variant,
          [styles.disabled]: disabled,
          [styles.border]: border,
          [styles[`wrapper-${wrapper}`]]: wrapper,
        })}
        onClick={handleDivClick}
        ref={inputRef}
        {...props}
      >
        {slotsLeft && (
          <div
            className={clsx(styles.input__slots, {
              [styles.input__slots__pointer]: pointer,
            })}
          >
            {slotsLeft}
          </div>
        )}
        <input disabled={disabled} {...props} />
        {message && <div className={styles.input__message}>{message}</div>}
        {slotsRight && (
          <div
            className={clsx(styles.input__slots, {
              [styles.input__slots__pointer]: pointer,
            })}
          >
            {slotsRight}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
