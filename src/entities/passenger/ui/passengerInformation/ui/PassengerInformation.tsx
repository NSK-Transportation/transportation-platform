/* eslint-disable @conarti/feature-sliced/absolute-relative */
import { Passenger } from "@/entities/passenger/model/types/passenger.types";
import { Box, Stacks, Typography } from "@/shared/ui";
import { usePassengerStore } from "../../../model/store/passenger.store";
import { getConfig } from "../config/PassengerInformation.config";

export const PassengerInformation = () => {
  const { passenger } = usePassengerStore();

  if (!passenger) {
    <Box style={{ alignSelf: "flex-start" }}>
      <Stacks direction="column" gap={16}>
        <Typography variant="h3" color="secondary">
          Информация о билете
        </Typography>
      </Stacks>
    </Box>;
  }

  const config = getConfig(passenger as Passenger);

  return (
    <Box fullWidth style={{ alignSelf: "flex-start" }}>
      <Stacks fullwidth direction="column" gap={8}>
        <Typography variant="h3" color="secondary">
          Информация о пассажире
        </Typography>
        {passenger.id && (
          <Box variant="dashed">
            <Stacks fullwidth gap={4} direction="column">
              {config.fields.map((field, index) => (
                <Stacks key={index} justifyContent="space-between">
                  <Typography variant="h3" weight="bold">
                    {field.label}:
                  </Typography>
                  <Typography variant="h3" color={field.color as "primary" | "secondary"}>
                    {field.value}
                  </Typography>
                </Stacks>
              ))}
            </Stacks>
          </Box>
        )}
      </Stacks>
    </Box>
  );
};
