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
  DropdownStation,
  InputGroup,
  Stacks,
  Typography,
} from "@/shared/ui";
import { useState } from "react";
import { City, Direction, Station, Way } from "@/app/@types";
import { useQuery } from "react-query";
import { formatDate } from "@/shared/utils";
import { getWays } from "@/shared/api/queries";
import { useSaleTicket } from "../SaleTicket.store";

interface WayMenuProps {
  direction: Direction;
}

export const WayMenu = ({ direction }: WayMenuProps) => {
  const {
    way,
    setWay,
    setWayDetail,
    setActiveWay,
    options: { cities },
  } = useSaleTicket();

  const { refetch, isFetching } = useQuery(
    [`way-${direction}`, way[direction]],
    () => getWays(way[direction], direction),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const [message, setMessage] = useState<Partial<Record<keyof Way, string>>>({});

  const handleStationChange = (city: City, station: Station, name: keyof Way) => {
    setWay({
      ...way,
      [direction]: {
        ...way[direction],
        [name]: {
          city: city,
          station: station,
        },
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
    setWayDetail(null, direction);
    setActiveWay(null, direction);
    const newMessage = { ...message };

    if (!way[direction].from) {
      newMessage.from = "Пожалуйста, выберите станцию";
    }
    if (!way[direction].to) {
      newMessage.to = "Пожалуйста, выберите станцию";
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
      setWayDetail(data, direction);
    }
  };

  return (
    <>
      <Box color="blue">
        <Stacks fullwidth direction="column" gap={8}>
          <Typography variant="h3" color="default-white">
            {direction === "return" ? "Выберите обратный рейс" : "Выберите рейс"}
          </Typography>
          <InputGroup fullWidth>
            <Calendar
              onChange={handleDateChange}
              name="date"
              placeholder="Дата отправления"
              minDate={new Date()}
              value={way[direction]?.date}
              message={message.date}
              border={false}
            />
            <DropdownStation
              name="from"
              value={`${way[direction]?.from.city?.rus}-${way[direction]?.from.station.rus}`}
              selected={way[direction]?.to.station}
              onClick={(city, station) => handleStationChange(city, station, "from")}
              placeholder="Станция отправления"
              message={message.from}
              border={false}
              options={cities}
            />
            <DropdownStation
              name="to"
              value={`${way[direction]?.to.city.rus}-${way[direction]?.to.station.rus}`}
              selected={way[direction]?.to.station}
              onClick={(city, station) => handleStationChange(city, station, "to")}
              placeholder="Станция прибытия"
              message={message.to}
              border={false}
              options={cities}
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
          name="remoteSale"
          alignSelf="flex-end"
          label="Удалённая продажа"
          checked={way.remoteSale}
          onChange={() => setWay({ ...way, remoteSale: !way.remoteSale })}
        />
      )}
    </>
  );
};
