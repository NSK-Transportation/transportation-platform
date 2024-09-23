import { Box, Stacks, Typography } from "@/shared/ui";
import { useRefundTicket } from "../RefundTicket.store";
import { getConfig } from "./InfoAboutTicket.config";
import { Passenger } from "@/app/@types";

export const InfoAboutTicket = () => {
  const { passenger } = useRefundTicket();

  const config = getConfig(passenger as Passenger, "there");

  return (
    <Box style={{ alignSelf: "flex-start" }}>
      <Stacks direction="column" gap={16}>
        <Typography variant="h3" color="secondary">
          Информация о билете
        </Typography>
        {passenger.ticket?.there?.id &&
          config.fields.map((field, index) => (
            <Stacks key={index} gap={4}>
              <Typography variant="h3" weight={600}>
                {field.label}:
              </Typography>
              <Typography variant="h3" color={field.color as "primary" | "info" | "secondary"}>
                {field.value}
              </Typography>
            </Stacks>
          ))}
      </Stacks>
    </Box>
  );
};
