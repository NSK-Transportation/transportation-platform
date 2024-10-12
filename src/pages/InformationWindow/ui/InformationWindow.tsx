import { useEffect, useState } from "react";
import { Passenger } from "@/entities/passenger";
import { Box, Stacks, Typography } from "@/shared/ui";

export const InformationWindow = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  useEffect(() => {
    const channel = new BroadcastChannel("passenger_channel");

    const handleMessage = (event: MessageEvent) => {
      const { type, passengers } = event.data;
      if (type === "GET_PASSENGER") {
        setPassengers(passengers);
      }
    };
    channel.onmessage = handleMessage;
  }, []);

  return (
    <Stacks style={{ height: "100vh" }} direction="column" justifyContent="center">
      <Box>
        {passengers.length === 0 ? (
          <Typography>Нет пассажиров</Typography>
        ) : (
          <Stacks direction="column" gap={16}>
            {passengers?.map((passenger) => <Box key={passenger.id}>{passenger.id}</Box>)}
          </Stacks>
        )}
      </Box>
    </Stacks>
  );
};
