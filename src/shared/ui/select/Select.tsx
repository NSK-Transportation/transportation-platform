import clsx from "clsx";
import { useState, useRef, useEffect, forwardRef, SelectHTMLAttributes, ChangeEvent } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Select.module.scss";

export interface Option {
  value: string | number | undefined;
  label: string | undefined;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: Option[];
  fullWidth?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, fullWidth, value, placeholder, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value) || null;

    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Option) => {
      setIsOpen(false);
      if (onChange) {
        const event = {
          target: { value: option.value },
        } as ChangeEvent<HTMLSelectElement>;
        onChange(event);
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

    return (
      <div
        className={clsx(styles.selectWrapper, className, { [styles.fullWidth]: fullWidth })}
        ref={selectRef}
      >
        <div className={clsx(styles.select, { [styles.open]: isOpen })} onClick={handleSelectClick}>
          {selectedOption ? (
            selectedOption.label
          ) : (
            <div className={styles.select__placeholder}>{placeholder}</div>
          )}
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
