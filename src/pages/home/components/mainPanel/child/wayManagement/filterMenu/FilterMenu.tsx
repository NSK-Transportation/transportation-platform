import { Calendar, Checkbox, Input, InputGroup, Stacks } from "@/shared/ui";
import { CancelIcon } from "@/shared/assets";

interface WayMenuProps {
  returnWay?: boolean;
}

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const FilterMenu = ({ returnWay }: WayMenuProps) => {
  return (
    <Stacks direction="row" gap={15}>
      <Stacks direction="row" gap={1}>
        <InputGroup fullWidth>
          <Calendar
            name="date"
            placeholder="Дата отправления"
            minDate={new Date()}
            // onChange={}
            // value={}
          />
          <Input
            style={{ width: "270px" }}
            name="to"
            type="text"
            placeholder="Рейс"
            slots={<CancelIcon cursor={"pointer"} onClick={() => alert("Open date")} />}
          />
        </InputGroup>
      </Stacks>
      <Checkbox label="Обратные рейсы" />
    </Stacks>
  );
};
