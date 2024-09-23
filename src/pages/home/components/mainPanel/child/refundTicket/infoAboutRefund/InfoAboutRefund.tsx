import { DownloadIcon } from "@/shared/assets";
import { Alert, Box, Divider, Stacks, Typography } from "@/shared/ui";

export const InfoAboutRefund = () => {
  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography variant="h3">Информация о возврате</Typography>
        <Stacks gap={16}>
          <Divider orientation="vertical" color="blue" />
          <Typography variant="h3" color="primary" cursor="pointer">
            <Stacks gap={8}>
              Печать бланка на возврат билета
              <DownloadIcon size={18} />
            </Stacks>
          </Typography>
        </Stacks>
        <Alert
          label={
            <Stacks direction="column">
              <Typography variant="h4">Билет возвращается:</Typography>
              <Typography variant="h4" color="primary-second">
                в течении 3ч после отправления рейса
              </Typography>
            </Stacks>
          }
        />
        <Typography variant="h3">Удержано: {"Null"}</Typography>
        <Typography variant="h3">Процент удержания: {"Null"}</Typography>
        <Typography variant="h3">Возврат: {"Null"}</Typography>
        <Typography variant="h3">Тип возврата: {"Null"}</Typography>
      </Stacks>
    </Box>
  );
};
