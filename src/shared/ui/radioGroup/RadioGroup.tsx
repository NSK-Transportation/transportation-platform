import { FC } from "react";
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
  selected: RadioType["value"];
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: FC<RadioGroupProps> = ({
  name,
  radios,
  selected,
  onChange,
  className,
  ...props
}) => {
  const handleChange = (value: string) => onChange?.(value);

  return (
    <div className={clsx(styles.radioGroup, className)} {...props}>
      {radios.map(({ value, title }) => (
        <Radio
          key={value}
          name={name}
          value={value}
          label={title}
          checked={selected === value}
          onChange={() => handleChange(value)}
        />
      ))}
    </div>
  );
};

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
