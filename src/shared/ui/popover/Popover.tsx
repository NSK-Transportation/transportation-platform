import { ReactNode, HTMLAttributes, forwardRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { Placement } from "@floating-ui/core";
import styles from "./Popover.module.scss";
import clsx from "clsx";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  children: ReactNode;
  placement?: Placement;
  actions?: ReactNode;
  className?: string;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ trigger, placement = "top", children, actions, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
      placement,
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [offset(10), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    return (
      <>
        {trigger && (
          <div ref={refs.setReference} {...getReferenceProps()}>
            {trigger}
          </div>
        )}
        {isOpen && (
          <div
            ref={refs.setFloating || ref}
            className={clsx(styles.popover, className)}
            style={floatingStyles}
            {...getFloatingProps()}
            {...props}
          >
            {children}
            {actions && <div className={styles.popover__actions}>{actions}</div>}
          </div>
        )}
      </>
    );
  },
);

Popover.displayName = "Popover";

export { Popover };
