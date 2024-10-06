import { useClick, useDismiss, useFloating, useInteractions } from "@floating-ui/react";
import { offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { FC, useState } from "react";
import Calendar from "react-calendar";
import "./CustomCalendar.scss";
import { createPortal } from "react-dom";
import { Input } from "../input/Input";

interface CalendarProps {
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  showNavigation?: boolean;
  showNeighboringMonth?: boolean;
  locale?: string;
  name?: string;
  placeholder?: string;
  inputValue: string;
  calendarValue: Date | null;
  message?: string;
  border?: false;
}

export const CustomCalendar: FC<CalendarProps> = (
  {
    onChange,
    minDate,
    maxDate,
    showNavigation = true,
    showNeighboringMonth = false,
    locale = "ru-RU",
    name,
    placeholder,
    inputValue,
    calendarValue,
    message,
    border = true,
  },
  ...props
) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <Input
        ref={refs.setReference}
        name={name}
        message={message}
        border={border}
        placeholder={placeholder}
        style={{ cursor: "pointer" }}
        value={inputValue}
        readOnly
        {...getReferenceProps()}
        onWrapperClick={() => setIsOpen(true)}
      />

      {isOpen &&
        createPortal(
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            className="container"
          >
            <Calendar
              onChange={(date) => onChange(date as Date)}
              minDate={minDate}
              maxDate={maxDate}
              showNavigation={showNavigation}
              showNeighboringMonth={showNeighboringMonth}
              locale={locale}
              value={calendarValue}
              {...props}
            />
          </div>,
          document.body,
        )}
    </>
  );
};
