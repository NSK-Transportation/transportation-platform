/* eslint-disable @conarti/feature-sliced/layers-slices */
import { FC, ReactNode } from "react";
import { Passenger } from "@/entities/passenger";
import { Alert, Box, Skeleton, Stacks, Typography } from "@/shared/ui";
import { Refund } from "../../model/types/refund.types";

interface Props {
  action: ReactNode;
  passenger: Passenger;
  refund: Refund | undefined;
}

export const RefundInformation: FC<Props> = ({ action, passenger, refund }) => {
  return (
    <Box>
      <Stacks direction="column" gap={16}>
        {passenger ? (
          <Typography variant="h3">Информация о возврате</Typography>
        ) : (
          <Typography variant="h3" color="secondary">
            Выполните поиск пассажира для возврата билета
          </Typography>
        )}
        {passenger?.id && (
          <>
            {action}
            <Alert
              label={
                <Stacks direction="column">
                  <Typography variant="h3">Билет возвращается:</Typography>
                  <Typography variant="h3" color="primary-second">
                    в течении 3ч после отправления рейса
                  </Typography>
                </Stacks>
              }
            />
            {refund ? (
              <Stacks direction="column" gap={8}>
                <Typography variant="h3">Удержано: {refund?.withheld} руб</Typography>
                <Typography variant="h3">
                  Процент удержания: {refund?.retentionPercentage} %
                </Typography>
                <Typography variant="h3">Возврат: {refund?.amount} руб</Typography>
                <Typography variant="h3">Тип возврата: {refund?.payment.rus}</Typography>
              </Stacks>
            ) : (
              <Stacks direction="column" gap={8}>
                <Skeleton width={100} height={21} />
                <Skeleton width={180} height={21} />
                <Skeleton width={120} height={21} />
                <Skeleton width={100} height={21} />
              </Stacks>
            )}
          </>
        )}
      </Stacks>
    </Box>
  );
};
