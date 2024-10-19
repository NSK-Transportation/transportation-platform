import { Refund } from "@/widgets/Refund";
import { PassengerSearchForm } from "@/features/passenger";
import { PassengerInformation, usePassengerStore } from "@/entities/passenger";
import { TicketInformation } from "@/entities/ticket";
import { WayInfo } from "@/entities/way";
import { WayDetail } from "@/entities/wayDetails";
import { Grid, Stacks } from "@/shared/ui";

export const RefundTicket = () => {
  const { passenger } = usePassengerStore();

  return (
    <Grid columns="2fr 1fr" gap={16}>
      <Grid rows="span">
        <PassengerSearchForm />
      </Grid>
      <Grid rows="span 3">
        <Stacks gap={16} direction="column">
          <Refund />
        </Stacks>
      </Grid>
      <Grid columns="2fr 3fr" gap={16}>
        <PassengerInformation />
        <TicketInformation
          wayInfoThere={<WayInfo activeWay={passenger?.ticket.there?.wayDetail as WayDetail} />}
          wayInfoReturn={<WayInfo activeWay={passenger?.ticket.return?.wayDetail as WayDetail} />}
        />
      </Grid>
    </Grid>
  );
};
