import { FC, ReactNode } from "react";
import { Alert, Box, Stacks, Typography } from "@/shared/ui";
import { useRefundStore } from "../../model/store/refund.store";

interface Props {
  action: ReactNode;
}

export const RefundInformation: FC<Props> = ({ action }) => {
  const { refund } = useRefundStore();
  return (
    <Box>
      <Stacks direction="column" gap={16}>
        <Typography>Информация о возврате</Typography>
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
        <Stacks direction="column" gap={8}>
          <Typography variant="h3">Удержано: {refund.withheld} руб</Typography>
          <Typography variant="h3">Процент удержания: {refund.retentionPercentage} %</Typography>
          <Typography variant="h3">Возврат: {refund.amount} руб</Typography>
          <Typography variant="h3">Тип возврата: {refund.type}</Typography>
        </Stacks>
      </Stacks>
    </Box>
  );
};
