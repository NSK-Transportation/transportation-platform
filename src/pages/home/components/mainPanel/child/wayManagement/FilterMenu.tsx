import { CancelIcon } from "@/shared/assets/icons";
import { Calendar, Checkbox, Input, InputGroup, Stacks } from "@/shared/ui";
 
export const FilterMenu = () => {
    return (
        <Stacks direction="row" gap={15}>
          <Stacks direction="row" gap={1}>
            <InputGroup fullWidth>
              <Calendar
                onChange={(date: Date | Date[]) => {
                  if (date instanceof Date) {
                    new Date().toLocaleDateString();
                  }
                }}
                name="date"
                placeholder="Дата отправления"
                minDate={new Date()}
                value={new Date().toLocaleDateString("ru-RU", {
                  "year": "numeric",
                  "month": "numeric",
                  "day": "numeric"
              })}
              />
              <Input
                style={{ width: "270px" }}
                name="to"
                type="text"
                value="Кемерово-Новосибирск"
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