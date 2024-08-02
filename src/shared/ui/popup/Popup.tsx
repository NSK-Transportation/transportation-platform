import { ReactNode, HTMLAttributes, forwardRef, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Popup.module.scss";
import clsx from "clsx";

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  ({ isOpen, onClose, children, icon, className, ...props }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isOpen && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
      <div ref={ref} className={clsx(styles.popup__wrapper, className)} onClick={onClose}>
        <div
          ref={contentRef}
          className={styles.popup__content}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          <button className={styles.popup__close} onClick={onClose}>
            &times;
          </button>
          {icon && <div className={styles.popup__icon}>{icon}</div>}
          {children}
        </div>
      </div>,
      document.body,
    );
  },
);

Popup.displayName = "Popup";

export { Popup };
