import { Box, Checkbox, Stacks, Typography } from "@/shared/ui";
import { useSaleTicket } from "../SaleTicket.store";

export const ReturnInfoItem = () => {
  const { activeWay, passengers, setPassenger, tickets } = useSaleTicket();

  return (
    <Box>
      <Stacks direction="column" gap={16}>
        <Typography variant="h3">Обратный билет пассажира</Typography>
        {passengers.map((passenger) => {
          const ticket = tickets.find((ticket) => ticket.type === passenger.ticket.there?.type);

          return (
            <Stacks key={passenger.id} gap={8}>
              <Checkbox
                label={`${passenger.lastName} ${passenger.firstName} ${passenger.patronymic}`}
                checked={Boolean(passenger.ticket.return)}
                onChange={(event) => {
                  setPassenger(passenger.id, "there", activeWay, {
                    ...passenger,
                    ticket: {
                      return: event.target.checked,
                    },
                  });
                }}
              />
              <Typography color="primary">{ticket?.rus}</Typography>
            </Stacks>
          );
        })}
      </Stacks>
    </Box>
  );
};
