import { Box, Button, Divider, Grid, Stacks, Tooltip, Typography } from "@/shared/ui";
import { useSaleTicket } from "../SaleTicket.store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSumValues } from "@/shared/utils";
import { Payment, PaymentType } from "@/app/@types";
import { useMutation } from "react-query";
import { postPayment } from "@/shared/api/mutations";
import { createRoot } from "react-dom/client";
import { PassengerInfoScreen } from "./PassengerInfoScreen";

export const WayPayment = () => {
  const {
    passengers,
    options: { payments },
    activeWay,
  } = useSaleTicket();
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [ticketSum, setTicketSum] = useState<number>(0);
  const [baggageSum, setBaggageSum] = useState<number>(0);

  useEffect(() => {
    if (!activeWay.there?.id) {
      navigate("/home/sale-ticket?step=0", { replace: true });
      navigate(0);
    }
  }, [activeWay, navigate]);

  if (!activeWay.there?.id) {
    return <Typography variant="h3">Маршрут не найден</Typography>;
  }

  useEffect(() => {
    setTicketSum(getSumValues(activeWay.there?.ticket.price, activeWay.return?.ticket.price));

    const baggagePrices = passengers.map((passenger) => {
      const thereBaggageSum = passenger.ticket.there?.baggage?.count
        ? activeWay.there?.baggage.price
        : 0;
      const returnBaggageSum = passenger.ticket.return?.baggage?.count
        ? activeWay.return?.baggage.price
        : 0;
      return getSumValues(thereBaggageSum, returnBaggageSum);
    });
    const totalBaggageSum = baggagePrices.reduce((acc, price) => acc + (price || 0), 0);
    setBaggageSum(totalBaggageSum);
  }, [passengers, activeWay]);

  const totalSum = getSumValues(ticketSum, baggageSum);

  const renderPriceDetail = (
    label: string,
    sum: number,
    therePrice: number,
    returnPrice?: number,
  ) => (
    <Typography variant="h5">
      {sum && (
        <>
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
        </>
      )}
    </Typography>
  );

  const { mutateAsync, isLoading } = useMutation((payment: Payment) =>
    postPayment(payment, totalSum),
  );

  const handlePayment = async (payment: Payment) => {
    setSelectedPayment(payment);

    if (payment.type === PaymentType.CASH) {
      console.log("Оплата наличными подтверждена. Спасибо!");
    } else {
      // TODO: Изменить логику для демонстрации оплаты и данных для пассажиров. 
      // Либо сделать всплывающее окно, либо реализовать дополнительный роут, где будут обновляются данные по ID конкретного оформления билета
      const newWindow = window.open("", "_blank", "width=800,height=600");
      if (newWindow) {
        newWindow.document.title = "Информация о пассажирах";
        newWindow.document.body.innerHTML = '<div id="passenger-info"></div>';

        const root = newWindow.document.getElementById("passenger-info");
        if (root) {
          const PassengerInfo = () => (
            <PassengerInfoScreen
              passengers={passengers}
              totalSum={totalSum}
              activeWay={activeWay}
            />
          );
          const reactRoot = createRoot(root);
          reactRoot.render(<PassengerInfo />);
        }
      }
      console.log("Перенаправление для СБП и Карты");
    }
  };

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
            {passengers.map((passenger) => {
              const thereBaggagePrice = passenger.ticket.there?.baggage?.count
                ? activeWay.there?.baggage.price
                : 0;
              const returnBaggagePrice = passenger.ticket.return?.baggage?.count
                ? activeWay.return?.baggage.price
                : undefined;

              return (
                <>
                  {renderPriceDetail(
                    "Пассажирский билет",
                    ticketSum,
                    activeWay.there?.ticket.price ?? 0,
                    activeWay.return?.ticket.price,
                  )}
                  {thereBaggagePrice || returnBaggagePrice
                    ? renderPriceDetail(
                        "Багажный билет",
                        baggageSum ?? 0,
                        thereBaggagePrice ?? 0,
                        returnBaggagePrice,
                      )
                    : null}
                </>
              );
            })}
          </Stacks>
        </Stacks>

        <Grid gap={16} columns="1fr 1fr 1fr">
          {payments.map((payment) => (
            <Button
              key={payment.id}
              variant={payment.type === selectedPayment?.type ? "selected" : "payment"}
              label={payment.rus}
              size="large"
              loading={isLoading}
              onClick={() => handlePayment(payment)}
            />
          ))}
        </Grid>
      </Stacks>
    </Box>
  );
};
