/**
 * Компонент WayMenu
 *
 * Компонент для выбора рейса, который позволяет пользователю выбрать дату, станцию отправления и станцию прибытия.
 * Также предоставляет возможность включения или отключения обратного билета.
 *
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
import { Direction, Way } from "@/app/@types";
import { useQuery } from "react-query";
import { formatDate } from "@/shared/utils";
import { getWays } from "@/shared/api/queries";
import { useSaleTicket } from "../SaleTicket.store";

interface WayMenuProps {
  direction: Direction;
}

export const WayMenu = ({ direction }: WayMenuProps) => {
  const { way, setWay, setWayDetails } = useSaleTicket();

  const { refetch, isFetching } = useQuery(
    ["ways", way],
    () => getWays(way[direction], direction),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const [message, setMessage] = useState<Partial<Record<keyof Way, string>>>({});

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWay({
      ...way,
      [direction]: {
        ...way[direction],
        [name]: value,
      },
    });
    setMessage({ ...message, [name]: "" });
  };

  const handleDateChange = (date: Date | Date[]) => {
    if (date instanceof Date) {
      setWay({
        ...way,
        [direction]: {
          ...way[direction],
          date: formatDate(date),
        },
      });
      setMessage({ ...message, date: "" });
    }
  };

  const handleClick = async () => {
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
      setWayDetails(data, direction);
    }
  };

  return (
    <>
      <Box color="blue">
        <Stacks fullwidth direction="column" gap={8}>
          <Typography variant="h3" color="default-white">
            {direction === "return" ? "Выберите обратный рейс" : "Выберите рейс"}
          </Typography>
          {direction}
          <InputGroup fullWidth>
            <Calendar
              onChange={handleDateChange}
              name="date"
              placeholder="Дата отправления"
              minDate={new Date()}
              value={way[direction]?.date}
              message={message.date}
            />
            <Input
              name="from"
              type="text"
              value={way[direction]?.from}
              onChange={handleInputChange}
              placeholder="Станция отправления"
              message={message.from}
            />
            <Input
              name="to"
              type="text"
              value={way[direction]?.to}
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
          <Button onClick={handleClick} loading={isFetching} label="Искать" />
        </Stacks>
      </Box>
      {direction === "there" && (
        <Checkbox
          alignSelf="flex-end"
          label="Удалённая продажа"
          checked={way.remoteSale}
          onChange={() => setWay({ ...way, remoteSale: !way.remoteSale })}
        />
      )}
    </>
  );
};
