import { Box, Label, Select, Stacks, Typography } from "@/shared/ui";
import { useMainStore } from "../../../MainPanel.store";
import { RefundReasonType } from "@/app/@types";

export const InfoAboutRefund = () => {
  const { passenger, reasons, setPassenger } = useMainStore((state) => state.refundTicket);

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography weight="bold" variant="h3">
          Информация о возврате
        </Typography>
        <Label variant="h3" text="Причина возврата">
          <Select
            placeholder="Выберите причину"
            options={reasons.map((reason) => ({
              label: reason.rus,
              value: reason.type,
            }))}
            value={passenger.ticket.refund?.type}
            onChange={(event) => {
              setPassenger({
                ticket: {
                  refund: {
                    type: event.target.value as RefundReasonType,
                  },
                },
              });
            }}
          />
        </Label>
        {passenger.lastName && (
          passenger.ticket.refund?.type === "delay" && (
            <>
              <Typography color="info" variant="h4">
                Билет возвращается: {"Null"}
              </Typography>
              <Typography variant="h3" weight="bold">
                Удержано: {"Null"}
              </Typography>
              <Typography variant="h3" weight="bold">
                Процент удержания: {"Null"}
              </Typography>
              <Typography variant="h3" weight="bold">
                Возврат: {"Null"}
              </Typography>
              <Typography variant="h3" weight="bold">
                Тип возврата: {"Null"}
              </Typography>
            </>
          ),
        )}
      </Stacks>
    </Box>
  );
};
