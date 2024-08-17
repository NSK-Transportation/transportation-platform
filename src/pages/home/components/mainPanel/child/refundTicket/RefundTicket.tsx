import { Button, Grid, Popup, Stacks, Typography } from "@/shared/ui";
import { EnterDataPassenger } from "./enterDataPassenger/EnterDataPassenger";
import { InfoAboutRefund } from "./infoAboutRefund/InfoAboutRefund";
import { InfoAboutPassenger } from "./infoAboutPassenger/InfoAboutPassenger";
import { InfoAboutTicket } from "./infoAboutTicket/InfoAboutTicket";
import { useMainStore } from "../../MainPanel.store";
import { useState } from "react";
import { CashReturnIcon } from "@/shared/assets";

export const RefundTicket = () => {
  const { passenger } = useMainStore((state) => state.refundTicket);
  const [isOpen, setIsOpen] = useState(false);

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
                disabled={!(passenger.ticket.refund?.type && passenger.lastName)}
                label="Возврат"
                onClick={() => setIsOpen(true)}
              />
            </Stacks>
          </Stacks>
        </Grid>
        <Grid columns="1fr 2fr" gap={16}>
          <InfoAboutPassenger />
          <InfoAboutTicket />
        </Grid>
      </Grid>
      <Popup icon={<CashReturnIcon />} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Stacks gap={16} direction="column" alignItems="center ">
          <Typography variant="h3">Возврат средств на сумму {"Null"} руб. совершен</Typography>
          <Typography variant="h3">Тип возврата: {"Null"}</Typography>
          <Typography color="secondary" variant="h3">Средства вернутся в течение 3-х рабочих дней</Typography>
        </Stacks>
      </Popup>
    </>
  );
};
