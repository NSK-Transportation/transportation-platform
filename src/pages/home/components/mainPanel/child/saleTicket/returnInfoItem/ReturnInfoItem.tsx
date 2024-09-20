import { Box, Checkbox, Stacks, Typography } from "@/shared/ui";
import { useSaleTicket } from "../SaleTicket.store";
import { getCapitalizeFirstLetter } from "@/shared/utils";

export const ReturnInfoItem = () => {
  const {
    activeWay,
    passengers,
    setPassenger,
    options: { tickets },
  } = useSaleTicket();

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
                  setPassenger(passenger.id, "return", activeWay.return, {
                    ...passenger,
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
