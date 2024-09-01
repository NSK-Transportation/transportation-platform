import { Box, Button, Divider, Grid, Stacks, Typography } from "@/shared/ui";
import { useMainStore } from "../../../MainPanel.store";

export const WayPayment = () => {
  const { passengers, payments, setPassenger, activeWay } = useMainStore(
    (state) => state.saleTicket,
  );

  return (
    <Box>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography variant="h3">Оплата</Typography>

        <Stacks gap={32} justifyContent="center">
          <Stacks gap={4}>
            <Typography variant="h3">К оплате:</Typography>
            <Typography variant="h3" weight="bold" color="info">
              {} рублей
            </Typography>
          </Stacks>
          <Divider orientation="vertical" />
          <Stacks direction="column">
            <Typography variant="h5" color="secondary">
              Из чего состоит сумма:
            </Typography>
            <Typography variant="h5">Пассажирский билет: {} рублей</Typography>
            <Typography variant="h5">Багажный билет: 0 рублей</Typography>
            <Typography variant="h5">Дополнительные услуги: 0 рублей</Typography>
          </Stacks>
        </Stacks>

        <Grid gap={16} columns={"1fr 1fr 1fr"}>
          {payments.map((payment, index) => {
            return (
              <Button
                key={payment.id}
                variant={
                  passengers[index]?.ticket.there.payment?.id === payment?.id
                    ? "selected"
                    : "payment"
                }
                label={payment.rus}
                size="large"
                onClick={() => {
                  setPassenger(passengers[0].id, {
                    ...passengers[0],
                    ticket: {
                      ...passengers[0].ticket,
                      there: {
                        ...passengers[0].ticket.there,
                        payment: {
                          ...passengers[0].ticket.there.payment,
                          id: payment.id,
                        },
                      },
                    },
                  });
                }}
              />
            );
          })}
        </Grid>
      </Stacks>
    </Box>
  );
};
