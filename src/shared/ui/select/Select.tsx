import { useState, useRef, useEffect, forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";
import { IoIosArrowDown } from "react-icons/io";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: { value: string; label: string }[];
  fullWidth?: boolean;
  defaultValue?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, fullWidth, defaultValue, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(defaultValue || null);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: { value: string; label: string }) => {
      setSelectedOption(option.value);
      setIsOpen(false);
      if (props.onChange) {
        const event = {
          target: { value: option.value },
        } as React.ChangeEvent<HTMLSelectElement>;
        props.onChange(event);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (defaultValue) {
        const defaultOption = options.find((option) => option.value === defaultValue);
        if (defaultOption) {
          setSelectedOption(defaultOption.value);
        }
      }
    }, [defaultValue, options]);

    const selectedLabel =
      options.find((option) => option.value === selectedOption)?.label || "Placeholder";

    return (
      <div
        className={clsx(styles.selectWrapper, className, { [styles.fullWidth]: fullWidth })}
        ref={selectRef}
      >
        <div className={clsx(styles.select, { [styles.open]: isOpen })} onClick={handleSelectClick}>
          {selectedLabel}
          <span className={clsx(styles.arrow, { [styles.open]: isOpen })}>
            <IoIosArrowDown />
          </span>
        </div>
        {isOpen && (
          <ul className={styles.options}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={clsx(styles.options__item, {
                  [styles.options__selected]: option.value === selectedOption,
                })}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
