import clsx from "clsx";
import { FC, ReactNode } from "react";
import { WayDetail } from "@/entities/wayDetails";
import { Box, Stacks, Typography } from "@/shared/ui";
import styles from "./WayManagementItem.module.scss";

interface Props {
  data: WayDetail;
  isSelected: boolean;
  onClick: () => void;
  checkbox: ReactNode;
  chip: ReactNode;
}

export const WayManagementItem: FC<Props> = ({ data, isSelected, onClick, checkbox, chip }) => {
  return (
    <Box
      cursor="pointer"
      className={clsx(styles.item, {
        [styles.item__isSelected]: isSelected,
      })}
      onClick={onClick}
    >
      <Stacks justifyContent="space-between">
        <Stacks gap={12} alignItems="flex-start" justifyContent="space-between">
          {checkbox}
          <Stacks gap={4} alignItems="flex-end">
            <Typography variant="h1" weight={600} color="primary-second">
              {data.from.time}
            </Typography>
            <Typography color="info" variant="h4">
              {data.from.date}
            </Typography>
          </Stacks>
        </Stacks>

        <Stacks gap={12} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Typography variant="h3" color="primary">
            {"Толмачево АП"} - {"Кемерово АВ"}
          </Typography>

          {isSelected && (
            <Stacks gap={4} direction="row" alignItems="center">
              <Typography color="secondary" variant="h4">
                Водитель
              </Typography>
              <Typography variant="h3">{"Гусев А.В."}</Typography>
            </Stacks>
          )}
        </Stacks>

        <Stacks gap={12} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Stacks gap={16} direction="row">
            {chip}
            <Stacks gap={4} direction="row" alignItems="center">
              <Typography color="secondary" variant="h4">
                Свободных мест:
              </Typography>
              <Typography variant="h3">{"22"}</Typography>
            </Stacks>
          </Stacks>

          {isSelected && (
            <Stacks gap={4} direction="row" alignItems="center">
              <Typography color="secondary" variant="h4">
                АТП. сокр
              </Typography>
              <Typography variant="h3">{"ООО “НСК-АВТО”"}</Typography>
            </Stacks>
          )}
        </Stacks>

        <Stacks gap={12} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Stacks gap={16} direction="row">
            <Stacks gap={4} direction="row" alignItems="center">
              <Typography color="secondary" variant="h4">
                Занято:
              </Typography>
              <Typography variant="h3">{"22"}</Typography>
            </Stacks>
          </Stacks>
          {isSelected && <Typography variant="h3">{"YUTONG ZK6"}</Typography>}
        </Stacks>

        <Stacks gap={10} alignItems="flex-start" justifyContent="space-between" direction="column">
          <Typography variant="h3">{"О452УВ 154"}</Typography>
          {isSelected && <Typography variant="h3">{"Автобус"}</Typography>}
        </Stacks>

        <Stacks direction="column">
          <Stacks gap={8} alignItems="center">
            <Typography color="secondary" variant="h4">
              Прибыл:
            </Typography>
            <Typography variant="h4" color="primary">
              {"0:05:43"}
            </Typography>
            <Typography variant="h4">{"26 августа"}</Typography>
          </Stacks>
        </Stacks>
      </Stacks>
    </Box>
  );
};
