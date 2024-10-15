import { CSSProperties, forwardRef } from "react";
import clsx from "clsx";
import styles from "./RadioGroup.module.scss";
import { Radio } from "../radio/Radio";

interface RadioType {
  value: string;
  title: string;
}

export interface RadioGroupProps {
  name: string;
  radios: RadioType[];
  selected: string;
  direction: CSSProperties["flexDirection"] | undefined;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, radios, selected, direction = "column", onChange, className, ...props }, ref) => {
    return (
      <div
        className={clsx(styles.radioGroup, className)}
        style={{ flexDirection: direction }}
        ref={ref}
        {...props}
      >
        {radios.map(({ value, title }) => (
          <Radio
            key={value}
            id={`${name}-${value}`}
            name={name}
            value={value}
            label={title}
            checked={selected === value}
            onChange={() => onChange(value)}
          />
        ))}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
