import { FC } from "react";
import { SelectDate } from "@/features/date";
import { SetReturnWay, SelectWayDropdown, SearchWayButton } from "@/features/way";
import { Direction } from "@/shared/types";
import { Box, InputGroup, Stacks, Typography } from "@/shared/ui";

interface Props {
  direction: Direction;
}

export const SelectorWayForSaleTicket: FC<Props> = ({ direction }) => {
  return (
    <Box color="blue">
      <Stacks fullwidth direction="column" gap={8}>
        <Typography variant="h3" color="default-white">
          {direction === "return" ? "Выберите обратный рейс" : "Выберите рейс"}
        </Typography>
        <InputGroup fullWidth>
          <SelectDate name="date" placeholder="Выберите дату" />
          <SelectWayDropdown name="from" placeholder="Место отправления" />
          <SelectWayDropdown name="to" placeholder="Место прибытия" />
        </InputGroup>
        <Stacks justifyContent="flex-end">
          <SetReturnWay />
        </Stacks>
        <Stacks justifyContent="center">
          <SearchWayButton />
        </Stacks>
      </Stacks>
    </Box>
  );
};
