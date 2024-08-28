import { FC, useState } from "react";
import Calendar from "react-calendar";
import "./CustomCalendar.scss";
import { createPortal } from "react-dom";
import { useClick, useDismiss, useFloating, useInteractions } from "@floating-ui/react";
import { offset, flip, shift, autoUpdate } from "@floating-ui/react";
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
  value: string | number;
  message?: string;
}

export const CustomCalendar: FC<CalendarProps> = ({
  onChange,
  minDate,
  maxDate,
  showNavigation = true,
  showNeighboringMonth = false,
  locale = "ru-RU",
  name,
  placeholder,
  value,
  message,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(20), flip(), shift()],
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
        placeholder={placeholder}
        value={value}
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
            />
          </div>,
          document.body,
        )}
    </>
  );
};
