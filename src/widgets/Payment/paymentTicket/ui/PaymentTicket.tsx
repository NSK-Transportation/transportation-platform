import { useState } from "react";
import { Payment, usePaymentStore } from "@/entities/payment";
import { Box, Button, Divider, Grid, Stacks, Tooltip, Typography } from "@/shared/ui";

// TODO: Добавить второй экран для показа данных клиентам/пассажирам
// В сущность оплаты Payment добавить варианты оплаты, т.е.
// - если кассир выбрал наличку, то подключается логика для наличной оплаты (печать чека и т.д. по ТЗ)
// - если кассир выбрал карту, то подключается логика для оплаты картой (перенаправление на сервис оплаты или сигнал терминалу)
// - если кассир выбрал СБП, то подключается логика для СБП (на втором экране рендерится QR CODE)

export const PaymentTicket = () => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const {
    options: { payments },
  } = usePaymentStore();

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

  const handlePayment = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  return (
    <Box>
      <Stacks fullwidth direction="column" gap={16}>
        <Typography variant="h3">Оплата</Typography>

        <Stacks gap={32} justifyContent="center">
          <Stacks gap={4}>
            <Typography variant="h3">К оплате:</Typography>
            <Typography variant="h3" weight="bold" color="primary-second">
              TOTALSUM рублей
            </Typography>
          </Stacks>
          <Divider orientation="vertical" />
          <Stacks direction="column">
            <Typography variant="h5" color="secondary">
              Из чего состоит сумма:
            </Typography>

            <>
              {renderPriceDetail("Пассажирский билет", 0, 0, 0)}
              {renderPriceDetail("Багажный билет", 0, 0, 0)}
            </>
          </Stacks>
        </Stacks>

        <Grid gap={16} columns="1fr 1fr 1fr">
          {payments.map((payment) => (
            <Button
              key={payment.id}
              variant={payment.type === selectedPayment?.type ? "selected" : "payment"}
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
