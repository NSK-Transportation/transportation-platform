import {
  ChangeEvent,
  forwardRef,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
import styles from "./CountrySelect.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import {
  useFloating,
  autoUpdate,
  useDismiss,
  useInteractions,
  useRole,
  offset,
  flip,
} from "@floating-ui/react";
import { Country } from "@/app/@types";
import { createPortal } from "react-dom";

export interface CountrySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Country[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ options, onChange }, _ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Country | null>(options[0]);

    const { refs, floatingStyles, context } = useFloating({
      open: isDropdownOpen,
      onOpenChange: setIsDropdownOpen,
      middleware: [offset(10), flip()],
      whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });

    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

    const handleOptionClick = (country: Country) => {
      setSelectedOption(country);
      setIsDropdownOpen(false);
      if (onChange) {
        const event = { target: { value: country.dialCode } } as ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }
    };

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape" && isDropdownOpen) {
          setIsDropdownOpen(false);
        }
      },
      [isDropdownOpen],
    );

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
      <div>
        <div
          className={clsx(styles.dropdownTrigger, { [styles.open]: isDropdownOpen })}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <img
            src={selectedOption?.flag}
            alt={selectedOption?.name}
            className={styles.flag}
            loading="lazy"
          />
          <span className={clsx(styles.arrow, { [styles.open]: isDropdownOpen })}>
            <IoIosArrowDown />
          </span>
          <span>{selectedOption?.dialCode}</span>
        </div>
        {isDropdownOpen &&
          createPortal(
            <ul
              className={styles.countryList}
              style={floatingStyles}
              ref={refs.setFloating}
              {...getFloatingProps()}
              role="listbox"
              aria-activedescendant={selectedOption?.code}
            >
              {options?.map((option) => (
                <li
                  key={option.code}
                  onClick={() => handleOptionClick(option)}
                  className={clsx(styles.countryList__countryItem, {
                    [styles.countryList__selected]: option.code === selectedOption?.code,
                  })}
                  role="option"
                  aria-selected={option.code === selectedOption?.code}
                >
                  <img src={option.flag} alt={option.name} className={styles.flag} loading="lazy" />
                  <span className={styles.dialCode}>{option.dialCode}</span>
                  <span className={styles.countryName}>{option.rus}</span>
                </li>
              ))}
            </ul>,
            document.body,
          )}
      </div>
    );
  },
);
