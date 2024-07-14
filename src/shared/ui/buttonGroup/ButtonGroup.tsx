import { FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./ButtonGroup.module.scss";

interface ButtonGroupProps {
  className?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: ReactNode;
}

const ButtonGroup: FC<ButtonGroupProps> = ({ className, children, fullWidth, size = "small" }) => {
  return (
    <div
      className={clsx(styles.buttonGroup, className, {
        [styles.fullWidth]: fullWidth,
        [styles[size]]: size,
      })}
    >
      {children}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
