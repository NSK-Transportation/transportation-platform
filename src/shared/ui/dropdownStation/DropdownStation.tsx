import { forwardRef, useState } from "react";
import { useFloating, shift, offset, flip, autoUpdate } from "@floating-ui/react";
import clsx from "clsx";
import styles from "./DropdownStation.module.scss";
import { Input, InputProps } from "../input/Input";
import { useDismiss, useInteractions } from "@floating-ui/react";
import { Typography } from "../typography/Typography";
import { Stacks } from "../stacks/Stacks";
import { Grid } from "../grid/Grid";
import { Divider } from "../divider/Divider";
import { createPortal } from "react-dom";
import { City } from "@/app/@types";

export interface DropdownProps extends Omit<InputProps, "onClick"> {
  options: City[];
  onClick: (city: any, station: any) => void;
  selected: any;
}

export const DropdownStation = forwardRef<HTMLInputElement, DropdownProps>(
  ({ options, onClick, selected, ...props }, _ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [offset(20), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    return (
      <>
        <Input
          onWrapperClick={() => setIsOpen(!isOpen)}
          ref={refs.setReference}
          readOnly
          {...props}
          {...getReferenceProps()}
        />

        {isOpen &&
          createPortal(
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className={clsx(styles.dropdownMenu)}
            >
              <Grid columns="repeat(2, 1fr)" className={styles.fixed}>
                <Typography variant="h3" color="secondary">
                  Регион
                </Typography>
                <Typography variant="h3" color="secondary">
                  Станция
                </Typography>
              </Grid>
              <ul className={styles.options}>
                {options.map((city) => (
                  <Grid key={city.id} columns="repeat(2, 1fr)">
                    <li className={styles.optionName}>{city.rus}</li>
                    <Stacks direction="column">
                      {city.stations.map((station) => (
                        <>
                          <li
                            key={station.id}
                            className={clsx(styles.optionItem, {
                              [styles.selected]: station.name === selected?.name,
                            })}
                            onClick={() => onClick(city, station)}
                          >
                            {station.rus}
                          </li>
                          <Divider />
                        </>
                      ))}
                    </Stacks>
                  </Grid>
                ))}
              </ul>
            </div>,
            document.body,
          )}
      </>
    );
  },
);
