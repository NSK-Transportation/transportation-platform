
import { Calendar, Checkbox, Input, InputGroup, Stacks } from "@/shared/ui";
import { useMainStore } from "../../../MainPanel.store";
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
  const { way, setWay } = useMainStore((state) => state.saleTicket);
console.log(way.to)


  const dateValue = returnWay ? way.return?.date : way.to.date;

  return (
        <Stacks direction="row" gap={15}>
          <Stacks direction="row" gap={1}>
            <InputGroup fullWidth>
            <Calendar
              onChange={(date: Date | Date[]) => {
                if (date instanceof Date) {
                  setWay(
                    returnWay
                      ? {
                          ...way,
                          return: { ...way.return, date: formatDate(date) },
                        }
                      : {
                          ...way,
                          to: { ...way.to, date: formatDate(date) },
                        },
                  );
                }
              }}
              name="date"
              placeholder="Дата отправления"
              minDate={new Date()}
              value={dateValue}
            />
              <Input
                style={{ width: "270px" }}
                name="to"
                type="text"
                placeholder="Рейс"
                slots={
                    <CancelIcon cursor={"pointer"} onClick={() => alert('Open date')} />
                }
              />
            </InputGroup>
          </Stacks>
          <Checkbox label="Обратные рейсы" />
        </Stacks>
      );
};

