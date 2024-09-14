import { Box, Button, Divider, Grid, Stacks, Tooltip, Typography } from "@/shared/ui";
import { useSaleTicket } from "../SaleTicket.store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSumValues } from "@/shared/utils";

export const WayPayment = () => {
  const {
    passengers,
    options: { payments },
    setPassenger,
    activeWay,
  } = useSaleTicket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeWay.there?.id) {
      navigate(
        {
          pathname: "/home/sale-ticket",
          search: "?step=0",
        },
        { replace: true },
      );
      navigate(0);
    }
  }, [activeWay, navigate]);

  if (!activeWay.there?.id) {
    return <Typography variant="h3">Маршрут не найден</Typography>;
  }

  const sum = getSumValues(activeWay.there?.price, activeWay.return?.price);

  return (
    <Box>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography variant="h3">Оплата</Typography>

        <Stacks gap={32} justifyContent="center">
          <Stacks gap={4}>
            <Typography variant="h3">К оплате:</Typography>
            <Typography variant="h3" weight="bold" color="primary-second">
              {sum} рублей
            </Typography>
          </Stacks>
          <Divider orientation="vertical" />
          <Stacks direction="column">
            <Typography variant="h5" color="secondary">
              Из чего состоит сумма:
            </Typography>
            <Typography variant="h5">
              Пассажирский билет:{" "}
              <Tooltip
                text={
                  <>
                    <Typography variant="h5" color="secondary">
                      Туда: {activeWay.there?.price} руб
                    </Typography>
                    <Typography variant="h5" color="secondary">
                      Обратно: {activeWay.return?.price} руб
                    </Typography>
                  </>
                }
              >
                <Typography variant="h5" color="info" style={{ textDecorationLine: "underline" }}>
                  {sum} руб.
                </Typography>
              </Tooltip>{" "}
            </Typography>
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
                  passengers[index]?.ticket?.there?.payment?.id === payment?.id
                    ? "selected"
                    : "payment"
                }
                label={payment.rus}
                size="large"
                onClick={() => {}}
              />
            );
          })}
        </Grid>
      </Stacks>
    </Box>
  );
};
