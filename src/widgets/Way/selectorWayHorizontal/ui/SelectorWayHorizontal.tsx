import { FC } from "react";
import { SelectDate } from "@/features/date";
import { SelectWayDropdown, SearchWayButton } from "@/features/way";
import { Box, InputGroup, Stacks } from "@/shared/ui";

export const SelectorWayHorizontal: FC = () => {
  return (
    <Box color="blue">
      <Stacks fullwidth gap={8}>
        <InputGroup fullWidth>
          <SelectDate name="date" placeholder="Выберите дату" />
          <SelectWayDropdown name="from" placeholder="Место отправления" />
          <SelectWayDropdown name="to" placeholder="Место прибытия" />
        </InputGroup>
        <SearchWayButton />
      </Stacks>
    </Box>
  );
};
