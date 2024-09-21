import { Box, Button, Divider, Grid, Stacks, Tooltip, Typography } from "@/shared/ui";
import { useSaleTicket } from "../SaleTicket.store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSumValues } from "@/shared/utils";
import { Payment, PaymentType } from "@/app/@types";
import { useMutation } from "react-query";
import { postPayment } from "@/shared/api/mutations";

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
      navigate("/home/sale-ticket?step=0", { replace: true });
      navigate(0);
    }
  }, [activeWay, navigate]);

  if (!activeWay.there?.id) {
    return <Typography variant="h3">Маршрут не найден</Typography>;
  }

  const ticketSum = getSumValues(activeWay.there?.ticket.price, activeWay.return?.ticket.price);
  const baggageSum = getSumValues(activeWay.there?.baggage.price, activeWay.return?.baggage.price);
  const totalSum = getSumValues(ticketSum, baggageSum);

  const renderPriceDetail = (
    label: string,
    sum: number,
    therePrice: number,
    returnPrice?: number,
  ) => (
    <Typography variant="h5">
      {label}:{" "}
      <Tooltip
        text={
          <>
            <Typography variant="h5" color="secondary">
              Туда: {therePrice} руб
            </Typography>
            {returnPrice && (
              <Typography variant="h5" color="secondary">
                Обратно: {returnPrice} руб
              </Typography>
            )}
          </>
        }
      >
        <Typography variant="h5" color="info" line="underline">
          {sum} руб.
        </Typography>
      </Tooltip>
    </Typography>
  );

  const handlePayment = (payment: Payment) => {
    const { mutateAsync } = useMutation(() => postPayment(payment, totalSum));
    // passengers.forEach((passenger) => {
    //   setPassenger(passenger.id, "there", activeWay.there, {
    //     ticket: {
    //       there: {
    //         payment: {
    //           id: payment.id,
    //           type: payment.type,
    //         },
    //       },
    //     },
    //   });
    // });

    if (payment.type === PaymentType.CASH) {
      console.log("Оплата наличными подтверждена. Спасибо!");
      // navigate("/home/sale-ticket/success");
    } else {
      console.log("Перенаправление");
    }
  };

  const passengerHasPayment = (payment: Payment) =>
    passengers.some((passenger) => passenger?.ticket?.there?.payment?.type === payment.type);

  return (
    <Box>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography variant="h3">Оплата</Typography>

        <Stacks gap={32} justifyContent="center">
          <Stacks gap={4}>
            <Typography variant="h3">К оплате:</Typography>
            <Typography variant="h3" weight="bold" color="primary-second">
              {totalSum} рублей
            </Typography>
          </Stacks>
          <Divider orientation="vertical" />
          <Stacks direction="column">
            <Typography variant="h5" color="secondary">
              Из чего состоит сумма:
            </Typography>
            {renderPriceDetail(
              "Пассажирский билет",
              ticketSum,
              activeWay.there?.ticket.price,
              activeWay.return?.ticket.price,
            )}
            {renderPriceDetail(
              "Багажный билет",
              baggageSum,
              activeWay.there?.baggage.price,
              activeWay.return?.baggage.price,
            )}
            <Typography variant="h5">Дополнительные услуги: 0 рублей</Typography>
          </Stacks>
        </Stacks>

        <Grid gap={16} columns="1fr 1fr 1fr">
          {payments.map((payment) => (
            <Button
              key={payment.id}
              variant={Boolean(passengerHasPayment(payment)) ? "selected" : "payment"}
              label={payment.rus}
              size="large"
              onClick={() => handlePayment(payment)}
            />
          ))}
        </Grid>
      </Stacks>
    </Box>
  );
};
