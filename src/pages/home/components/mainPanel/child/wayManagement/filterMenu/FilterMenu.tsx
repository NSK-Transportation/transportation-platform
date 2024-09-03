import { Calendar, Input, InputGroup, Stacks } from "@/shared/ui";
import { useWayManagement } from "../WayManagement.store"; // Импорт хранилища
import { CancelIcon } from "@/shared/assets";

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const FilterMenu = () => {
  // Используем хранилище для управления состоянием пути
  const { wayDate, setWayDate } = useWayManagement(); 
  console.log(wayDate)
  // Определяем текущее значение даты и откуда
  const dateValue = wayDate?.date || "";
  const fromValue = wayDate?.from || ""; // Убедитесь, что значение по умолчанию - пустая строка

  return (
    <Stacks direction="row" gap={15}>
      <Stacks direction="row" gap={1}>
        <InputGroup fullWidth>
          <Calendar
            onChange={(date: Date | Date[]) => {
              if (date instanceof Date) {
                // Устанавливаем новую дату в состояние хранилища
                setWayDate({
                  date: formatDate(date), // Обновляем дату
                });
              }
            }}
            name="date"
            placeholder="Дата отправления"
            minDate={new Date()} // Минимальная дата - сегодня
            value={dateValue} // Текущее значение даты
          />
          <Input
            style={{ width: "270px" }}
            name="from"
            type="text"
            value={fromValue} // Текущее значение для поля 'from'
            onChange={(e) => {
              // Обновляем значение 'from' в состояние хранилища
              setWayDate({
                from: e.target.value,
              });
            }}
            placeholder="Рейс"
            slots={
              <CancelIcon cursor={"pointer"} onClick={() => alert("Open date")} />
            }
          />
        </InputGroup>
      </Stacks>
    </Stacks>
  );
};
