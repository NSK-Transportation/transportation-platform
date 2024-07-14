import { FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./InputGroup.module.scss";

interface InputGroupProps {
  className?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: ReactNode;
}

const InputGroup: FC<InputGroupProps> = ({ className, children, fullWidth, size = "small" }) => {
  return (
    <div
      className={clsx(styles.inputGroup, className, {
        [styles.fullWidth]: fullWidth,
        [styles[size]]: size,
      })}
    >
      {children}
    </div>
  );
};

InputGroup.displayName = "InputGroup";

export { InputGroup };
