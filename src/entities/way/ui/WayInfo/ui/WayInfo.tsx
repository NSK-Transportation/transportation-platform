/* eslint-disable @conarti/feature-sliced/layers-slices */
import { FC, ReactNode } from "react";
import { WayDetail } from "@/entities/wayDetails";
import { Divider, Stacks, Typography } from "@/shared/ui";
import { Tooltip } from "@/shared/ui";

interface Props {
  activeWay: WayDetail | null;
  actions?: ReactNode;
  typography?: ReactNode;
  border?: boolean;
}

export const WayInfo: FC<Props> = ({ activeWay, actions, border, typography }) => {
  return (
    <Stacks gap={8}>
      {border && <Divider orientation="vertical" color="blue" width={2} />}
      <Stacks gap={8} direction="column" fullwidth>
        {typography}
        <Stacks gap={4} direction="row" justifyContent="space-between">
          <Stacks gap={4} direction="row">
            <Typography variant="h3" weight={600}>
              Рейс №{activeWay?.wayNumber}
            </Typography>
            <Typography variant="h3" weight={600}>
              {activeWay?.from.city.rus} - {activeWay?.to.city.rus}
            </Typography>
          </Stacks>
          <Tooltip text={activeWay?.whoArive ?? ""} direction="down">
            <Typography cursor="pointer" color="secondary" variant="h4">
              Перевозчик
            </Typography>
          </Tooltip>
        </Stacks>
        <Stacks gap={32} direction="row">
          <Stacks direction="column">
            <Stacks gap={4} alignItems="flex-end">
              <Typography variant="h1" weight={600} color="primary-second">
                {activeWay?.from.time}
              </Typography>
              <Typography variant="h3" weight={600} color="primary">
                {activeWay?.from.date}
              </Typography>
            </Stacks>
            <Stacks direction="column">
              <Typography variant="h3" color="secondary">
                {activeWay?.from.city.rus} - {activeWay?.from.station.rus}
              </Typography>
              <Typography variant="h3" color="secondary">
                {activeWay?.from.street}, {activeWay?.from.house}
              </Typography>
            </Stacks>
          </Stacks>
          <Stacks direction="column">
            <Stacks gap={4} alignItems="flex-end">
              <Typography variant="h1" weight={600} color="primary-second">
                {activeWay?.to.time}
              </Typography>
              <Typography variant="h3" weight={600} color="primary">
                {activeWay?.to.date}
              </Typography>
            </Stacks>
            <Stacks direction="column">
              <Typography variant="h3" color="secondary">
                {activeWay?.to.city.rus} - {activeWay?.to.station.rus}
              </Typography>
              <Typography variant="h3" color="secondary">
                {activeWay?.to.street}, {activeWay?.to.house}
              </Typography>
            </Stacks>
          </Stacks>
        </Stacks>
        {actions}
      </Stacks>
    </Stacks>
  );
};
