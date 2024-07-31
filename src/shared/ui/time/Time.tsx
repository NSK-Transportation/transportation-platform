import { forwardRef, HTMLAttributes } from "react";
import { useTime } from "@siberiacancode/reactuse";
import clsx from "clsx";
import styles from "./Time.module.scss";

export interface TimeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Time = forwardRef<HTMLDivElement, TimeProps>(({ className, ...props }, ref) => {
  const { seconds, minutes, hours } = useTime();

  return (
    <div ref={ref} className={clsx(styles.time, className)} {...props}>
      {hours}:{minutes}
      <div className={styles.time__seconds}>:{seconds}</div>
    </div>
  );
});

Time.displayName = "Time";

export { Time };
