import { InformationPanel } from "@/widgets/Information";
import { Grid } from "@/shared/ui";
import { StepContent } from "./StepContent";

export const SaleTicket = () => {
  return (
    <Grid gap={16} columns={"1.5fr 1fr"} fullheight>
      <StepContent />
      <InformationPanel />
    </Grid>
  );
};
