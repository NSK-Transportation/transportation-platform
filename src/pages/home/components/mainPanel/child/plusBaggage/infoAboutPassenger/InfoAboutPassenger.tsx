import { Box, Stacks, Typography } from "@/shared/ui";
import { usePlusBaggage } from "../PlusBaggage.store";
import { getConfig } from "./InfoAboutPassenger.config";
import { Passenger } from "@/app/@types";

export const InfoAboutPassenger = () => {
  const { passenger } = usePlusBaggage();

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
                <Stacks key={index} gap={8}>
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
