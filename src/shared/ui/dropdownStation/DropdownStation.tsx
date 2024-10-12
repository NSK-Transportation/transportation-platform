import { useFloating, shift, offset, flip, autoUpdate, useClick } from "@floating-ui/react";
import { useDismiss, useInteractions } from "@floating-ui/react";
import clsx from "clsx";
import { forwardRef, Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { Divider } from "../divider/Divider";
import { Grid } from "../grid/Grid";
import { Input, InputProps } from "../input/Input";
import { Spinner } from "../spinner/Spinner";
import { Stacks } from "../stacks/Stacks";
import { Typography } from "../typography/Typography";
import styles from "./DropdownStation.module.scss";

export interface DropdownProps extends Omit<InputProps, "onClick"> {
  options: any;
  onClick: (city: any, station: any) => void;
  selected: any;
  loading?: boolean;
}

const DropdownStation = forwardRef<HTMLInputElement, DropdownProps>(
  ({ options, onClick, selected, loading, ...props }, _ref) => {
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
          onWrapperClick={() => setIsOpen(!isOpen)}
          ref={refs.setReference}
          style={{ cursor: "pointer" }}
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
              className={clsx(styles.dropdownMenu, {
                [styles.loading]: loading,
                [styles.optionUndefined]: options === undefined,
              })}
            >
              {loading ? (
                <Stacks fullwidth alignItems="center" justifyContent="center">
                  <Spinner />
                </Stacks>
              ) : options === undefined ? (
                <Typography align="center" variant="h3" color="secondary">
                  Нет опций
                </Typography>
              ) : (
                <>
                  <Grid columns="repeat(2, 1fr)" className={styles.fixed}>
                    <Typography variant="h3" color="secondary">
                      Регион
                    </Typography>
                    <Typography variant="h3" color="secondary">
                      Станция
                    </Typography>
                  </Grid>
                  <ul className={styles.options}>
                    {options?.map((city) => (
                      <Grid key={city.id} columns="repeat(2, 1fr)" alignItems="flex-start">
                        <li
                          className={clsx(styles.optionItem, {
                            [styles.selected]: city.name === selected.city,
                          })}
                          onClick={() => onClick(city, null)}
                        >
                          {city.rus}
                        </li>
                        <Stacks direction="column">
                          {city.stations.map((station) => (
                            <Fragment key={station.id}>
                              <li
                                className={clsx(styles.optionItem, {
                                  [styles.selected]: station.name === selected.station,
                                })}
                                onClick={() => onClick(city, station)}
                              >
                                {station.rus}
                              </li>
                              <Divider />
                            </Fragment>
                          ))}
                        </Stacks>
                      </Grid>
                    ))}
                  </ul>
                </>
              )}
            </div>,
            document.body,
          )}
      </>
    );
  },
);

DropdownStation.displayName = "DropdownStation";

export { DropdownStation };
