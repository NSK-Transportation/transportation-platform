import { useState, useRef, useEffect, forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";
import { IoIosArrowDown } from "react-icons/io";

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: Option[];
  fullWidth?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, fullWidth, value, placeholder, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (value !== undefined) {
        const selected = options.find((option) => option.value === value);
        if (selected) {
          setSelectedOption(selected);
        }
      }
    }, [value, options]);

    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
      setSelectedOption(option);
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

    const selectedLabel = selectedOption?.label || placeholder;

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
                  [styles.options__selected]: option.value === selectedOption?.value,
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
