/**
 * Компонент WayMenu
 *
 * Компонент для выбора рейса, который позволяет пользователю выбрать дату, станцию отправления и станцию прибытия.
 * Также предоставляет возможность включения или отключения обратного билета.
 *
 * @returns {JSX.Element} Отображает форму для выбора рейса и кнопку для поиска рейсов.
 */

import {
  Box,
  Button,
  Calendar,
  Checkbox,
  Input,
  InputGroup,
  Stacks,
  Typography,
} from "@/shared/ui";
import { ChangeEvent, useState } from "react";
import { useMainStore } from "../../../MainPanel.store";
import { WayDetails } from "@/app/@types";
import { useQuery } from "react-query";
import { formatDate } from "@/shared/utils";

interface WayMenuProps {
  returnWay?: boolean;
}

const searchWays = async (wayData: any): Promise<{ to: WayDetails[]; return: WayDetails[] }> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    const formattedData: WayDetails[] = data.map((user: any) => ({
      id: user.id,
      wayNumber: user.id,
      whoArive: user.name,
      price: 1276,
      seatsSelected: [],
      seats: [
        { id: 1, status: "free" },
        { id: 2, status: "free" },
        { id: 3, status: "booking" },
        { id: 4, status: "occupied" },
        { id: 5, status: "free" },
        { id: 6, status: "free" },
        { id: 7, status: "free" },
        { id: 8, status: "free" },
        { id: 9, status: "free" },
        { id: 10, status: "free" },
        { id: 11, status: "free" },
        { id: 12, status: "free" },
        { id: 13, status: "free" },
      ],
      from: {
        city: "Москва",
        street: "ул.Ленина",
        house: "67",
        station: "ЖД Вокзал",
        time: "13:20",
        date: "26 июня",
      },
      to: {
        city: "Кемерово",
        street: "пр.Кузнецкий",
        house: "81",
        station: "",
        time: "17:50",
        date: "26 июня",
      },
    }));

    return { to: formattedData, return: formattedData };
  } catch (error) {
    console.error("Ошибка при запросе данных:", error);
    return { to: [], return: [] };
  }
};

export const WayMenu = ({ returnWay }: WayMenuProps) => {
  const { way, setWay, setWayDetails } = useMainStore((state) => state.saleTicket);
  const { refetch, isFetching } = useQuery(["searchWays", way], () => searchWays(way), {
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const [message, setMessage] = useState<{ from?: string; to?: string; date?: string }>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWay(
      returnWay
        ? { ...way, return: { ...way.return, [name]: value } }
        : { ...way, to: { ...way.to, [name]: value } },
    );
    setMessage({ ...message, [name]: "" });
  };

  const handleDateChange = (date: Date | Date[]) => {
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
      setMessage({ ...message, date: "" });
    }
  };

  const handleCheckboxChange = () => {
    setWay({ ...way, remoteSale: !way.remoteSale });
  };

  const handleClick = async (direction: "to" | "return") => {
    const newMessage = { ...message };

    if (!way[direction].from) {
      newMessage.from = "Пожалуйста, заполните поле";
    }
    if (!way[direction].to) {
      newMessage.to = "Пожалуйста, заполните поле";
    }
    if (!way[direction].date) {
      newMessage.date = "Пожалуйста, выберите дату";
    }

    setMessage(newMessage);

    if (!way[direction].from || !way[direction].to || !way[direction].date) {
      return;
    }
    const { data } = await refetch();
    if (data) {
      setWayDetails(data[direction], direction);
    }
  };

  const dateValue = returnWay ? way.return?.date : way.to.date;

  return (
    <>
      <Box color="blue">
        <Stacks fullwidth direction="column" gap={8}>
          <Typography variant="h3" color="default-white">
            {returnWay ? "Выберите обратный рейс" : "Выберите рейс"}
          </Typography>
          <InputGroup fullWidth>
            <Calendar
              onChange={handleDateChange}
              name="date"
              placeholder="Дата отправления"
              minDate={new Date()}
              value={dateValue}
              message={message.date}
            />
            <Input
              name="from"
              type="text"
              value={returnWay ? way.return?.from : way.to.from}
              onChange={handleInputChange}
              placeholder="Станция отправления"
              message={message.from}
            />
            <Input
              name="to"
              type="text"
              value={returnWay ? way.return?.to : way.to.to}
              onChange={handleInputChange}
              placeholder="Станция прибытия"
              message={message.to}
            />
          </InputGroup>

          <Stacks justifyContent="flex-end">
            <Typography
              cursor="pointer"
              onClick={() => setWay({ ...way, returnHave: !way.returnHave })}
              variant="h3"
              color="default-white"
            >
              {way.returnHave ? "-" : "+"} Обратный билет
            </Typography>
          </Stacks>
        </Stacks>

        <Stacks fullwidth justifyContent="center">
          <Button
            onClick={() => handleClick(returnWay ? "return" : "to")}
            loading={isFetching}
            label="Искать"
          />
        </Stacks>
      </Box>
      <Checkbox
        alignSelf="flex-end"
        label="Удалённая продажа"
        checked={way.remoteSale}
        onChange={handleCheckboxChange}
      />
    </>
  );
};
