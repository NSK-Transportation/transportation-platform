import { Button, Grid, Popup, Stacks, Typography } from "@/shared/ui";
import { EnterDataPassenger } from "./enterDataPassenger/EnterDataPassenger";
import { InfoAboutRefund } from "./infoAboutRefund/InfoAboutRefund";
import { InfoAboutPassenger } from "./infoAboutPassenger/InfoAboutPassenger";
import { InfoAboutTicket } from "./infoAboutTicket/InfoAboutTicket";
import { useState } from "react";
import { CashReturnIcon } from "@/shared/assets";
import { useMutation } from "react-query";
import { useRefundTicket } from "./RefundTicket.store";

export const RefundTicket = () => {
  const { passenger } = useRefundTicket();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isLoading } = useMutation(async (data: any) => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok === true) {
      setIsOpen(true);
    } else {
      alert(`Ошибка ${response.status}`);
    }
    return;
  });

  return (
    <>
      <Grid columns="2fr 1fr" gap={16}>
        <Grid rows="span">
          <EnterDataPassenger />
        </Grid>
        <Grid rows="span 3">
          <Stacks gap={16} direction="column">
            <InfoAboutRefund />
            <Stacks fullwidth justifyContent="flex-end">
              <Button
                disabled={!(passenger.ticket && passenger.lastName)}
                loading={isLoading}
                label="Возврат"
                onClick={() => mutate({ type: passenger.ticket })}
              />
            </Stacks>
          </Stacks>
        </Grid>
        <Grid columns="1fr 2fr" gap={16}>
          <InfoAboutPassenger />
          <InfoAboutTicket />
        </Grid>
      </Grid>
      {/* <Popup icon={<CashReturnIcon />} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Stacks gap={16} direction="column" alignItems="center ">
          <Typography variant="h3">
            Возврат средств на сумму {passenger?.ticket.refund?.amount || 0} руб. совершен
          </Typography>
          <Typography variant="h3">
            Тип возврата: {passenger.ticket.refund?.type || "Неизвестно"}
          </Typography>
          <Typography color="secondary" variant="h3">
            Средства вернутся в течение 3-х рабочих дней
          </Typography>
        </Stacks>
      </Popup> */}
    </>
  );
};
