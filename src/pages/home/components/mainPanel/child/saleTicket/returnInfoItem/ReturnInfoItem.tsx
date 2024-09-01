import { Box, Checkbox, Stacks, Typography } from "@/shared/ui";
import { useMainStore } from "../../../MainPanel.store";

export const ReturnInfoItem = () => {
  const { passengers, setPassenger } = useMainStore((state) => state.saleTicket);

  return (
    <Box>
      <Stacks direction="column" gap={16}>
        <Typography variant="h3">Обратный билет пассажира</Typography>
        {passengers.map((passenger) => (
          <Stacks key={passenger.id} gap={8}>
            <Checkbox
              label={`${passenger.lastName} ${passenger.firstName} ${passenger.patronymic}`}
              checked={Boolean(passenger.ticket.return)}
              onChange={(event) => {
                setPassenger(passenger.id, {
                  ...passenger,
                  ticket: {
                    ...passenger.ticket,
                    return: event.target.checked,
                  },
                });
              }}
            />
            <Typography color="primary">{passenger?.ticket?.there.rus}</Typography>
          </Stacks>
        ))}
      </Stacks>
    </Box>
  );
};
