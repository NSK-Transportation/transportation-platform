import React, { useState, useRef, useEffect, forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "active";
  options: { value: string; label: string }[];
  placeholder?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, variant = "default", options, placeholder, fullWidth, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [borderColor, setBorderColor] = useState<string>("var(--select-default-border-color)");
    const [svgColor, setSvgColor] = useState<string>("var(--select-default-color)");
    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelectClick = () => {
      if (!isOpen) {
        setSvgColor("var(--select-default-active-color)"); 
      }
      setIsOpen(!isOpen);
      setBorderColor(isOpen ? "var(--select-default-border-color)" : "var(--select-default-active-color)");
    };

    const handleOptionClick = (option: { value: string; label: string }) => {
      setSelectedOption(option.label);
      setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setBorderColor("var(--select-default-active-color)");
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
        className={clsx(styles.selectWrapper, { [styles.fullWidth]: fullWidth })}
        ref={selectRef}
        style={{ borderColor }}
        {...props}
      >
        <div
          className={clsx(styles.styledSelect, { [styles.styledSelect__open]: isOpen })}
          style={{
            borderColor,
            color: selectedOption ? "var(--select-disabled-color)" : "var(--select-default-color)",
          }}
          onClick={handleSelectClick}
        >
          {selectedOption || placeholder}
          <span className={clsx(styles.arrow, { [styles.arrow__open]: isOpen })}>
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ stroke: svgColor }}
            >
              <path d="M0.5 1L5 5.5L9.5 1" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {isOpen && (
          <ul className={styles.styledSelect__options}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={styles.styledSelect__optionItem}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
