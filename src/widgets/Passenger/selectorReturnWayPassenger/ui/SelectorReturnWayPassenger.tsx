import { usePassengerStore } from "@/entities/passenger";
import { useTicketStore } from "@/entities/ticket";
import { useWayDetailStore } from "@/entities/wayDetails";
import { Box, Checkbox, Stacks, Typography } from "@/shared/ui";
import { getCapitalizeFirstLetter } from "@/shared/utils";

export const SelectorReturnWayPassenger = () => {
  const { passengers, updatePassenger } = usePassengerStore();
  const {
    options: { tickets },
  } = useTicketStore();
  const { activeWay } = useWayDetailStore();

  return (
    <Box>
      <Stacks direction="column" gap={16}>
        <Typography variant="h3">Обратный билет пассажира</Typography>
        {passengers.map((passenger, index) => {
          const ticket = tickets.find((ticket) => ticket.type === passenger.ticket.there?.type);
          const fullName = `${passenger.lastName} ${passenger.firstName} ${passenger.patronymic}`;

          return (
            <Stacks key={index} gap={8}>
              <Checkbox
                label={getCapitalizeFirstLetter(fullName)}
                checked={!!passenger.ticket.return}
                onChange={() => {
                  updatePassenger(passenger.id, {
                    ticket: {
                      ...passenger.ticket,
                      return: !passenger.ticket.return ? { wayDetail: activeWay.return } : null,
                    },
                  });
                }}
              />
              <Typography color="primary">{ticket?.rus || "Не найден"}</Typography>
            </Stacks>
          );
        })}
      </Stacks>
    </Box>
  );
};
