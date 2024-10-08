import moment from "moment";
import { FC } from "react";
import { useWayStore, Way } from "@/entities/way";
import { Calendar } from "@/shared/ui";

interface Props {
  name: keyof Way;
  placeholder: string;
  message?: string;
}

export const SelectDate: FC<Props> = ({ name, message, placeholder }) => {
  const { way, setWay } = useWayStore();

  const handleDateChange = async (date: Date) => {
    setWay({
      ...way,
      [name]: date,
    });
  };

  const formattedDate = way.date ? moment(way.date).format("DD.MM.YYYY") : "";

  return (
    <Calendar
      name={name}
      inputValue={formattedDate}
      calendarValue={way.date}
      onChange={(date) => handleDateChange(date)}
      placeholder={placeholder}
      message={message}
      minDate={new Date()}
    />
  );
};
