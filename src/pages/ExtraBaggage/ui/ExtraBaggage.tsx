import { AddBaggage } from "@/features/baggage";
import { PassengerSearchForm } from "@/features/passenger";
import { PassengerInformation } from "@/entities/passenger";
import { TicketInformation } from "@/entities/ticket";
import { Grid, Stacks } from "@/shared/ui";

export const ExtraBaggage = () => {
  return (
    <Grid columns="2fr 1fr" gap={16}>
      <Grid rows="span">
        <PassengerSearchForm />
      </Grid>
      <Grid rows="span 3">
        <Stacks gap={16} direction="column">
          <AddBaggage />
        </Stacks>
      </Grid>
      <Grid columns="2fr 3fr" gap={16}>
        <PassengerInformation />
        <TicketInformation />
      </Grid>
    </Grid>
  );
};