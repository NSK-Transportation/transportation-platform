import {
  forwardRef,
  TextareaHTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  LegacyRef,
} from "react";
import clsx from "clsx";
import styles from "./Textarea.module.scss";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  variant?: "default" | "error" | "success" | "warning";
  slots?: ReactNode;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", disabled, slots, fullWidth, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleDivClick = useCallback(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, []);

    return (
      <div
        className={clsx(styles.textarea, className, {
          [styles.fullWidth]: fullWidth,
          [styles[variant]]: variant,
          [styles.disabled]: disabled,
        })}
        onClick={handleDivClick}
        ref={ref as LegacyRef<HTMLDivElement>}
      >
        <textarea ref={textareaRef} disabled={disabled} {...props} />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
