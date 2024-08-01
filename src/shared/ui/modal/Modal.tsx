import { ReactNode, HTMLAttributes, forwardRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./Modal.module.scss";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  className?: string;
  direction?: "left";
  children: ReactNode;
  actions?: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, children, direction, actions, className, ...props }, ref) => {
    if (!isOpen) return null;

    return createPortal(
      <div
        ref={ref}
        className={clsx(styles.modal__wrapper, className, {
          [styles.left]: direction,
        })}
      >
        <div
          className={clsx(styles.modal__content, {
            [styles.left]: direction,
          })}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
          {actions && <div className={styles.modal__actions}>{actions}</div>}
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = "Modal";

export { Modal };
