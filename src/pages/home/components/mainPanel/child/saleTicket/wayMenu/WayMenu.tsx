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

  const { data, refetch, isFetching } = useQuery(
    [`way-${direction}`, way[direction]],
    () => getWays(way[direction]),
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
          city: city.name,
          station: station?.name,
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

  const handleTodayClick = () => {
    const today = new Date();
    handleDateChange(today);
    setMessage({ ...message, date: "" });
  };

  const handleClick = async () => {
    const newMessage = { ...message };

    if (!way[direction].from.city) {
      newMessage.from = "Пожалуйста, выберите станцию";
    }
    if (!way[direction].to.city) {
      newMessage.to = "Пожалуйста, выберите станцию";
    }
    if (!way[direction].date) {
      newMessage.date = "Пожалуйста, выберите дату";
    }

    setMessage(newMessage);

    if (way[direction]?.from?.city && way[direction]?.to?.city && way[direction]?.date) {
      setWayDetail(null, direction);
      setActiveWay(null, direction);
      const { data } = await refetch();
      if (data) {
        setWayDetail(data, direction);
      }
    }
  };

  const cityFrom = cities.find((city) => city.name === way[direction]?.from?.city);
  const stationFrom = cityFrom?.stations.find(
    (station) => station.name === way[direction]?.from?.station,
  );

  const cityTo = cities.find((city) => city.name === way[direction]?.to?.city);
  const stationTo = cityTo?.stations.find(
    (station) => station.name === way[direction]?.to?.station,
  );

  const changeButtonText = () => {
    if (data?.length === 0) {
      return "Маршруты не найдены";
    }
    return "Искать";
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
              value={
                way[direction]?.from.city
                  ? stationFrom?.rus
                    ? `${cityFrom?.rus}: ${stationFrom?.rus}`
                    : `${cityFrom?.rus}`
                  : ""
              }
              selected={way[direction]?.from}
              onClick={(city, station) => handleStationChange(city, station, "from")}
              placeholder="Станция отправления"
              message={message.from}
              border={false}
              options={cities}
            />
            <DropdownStation
              name="to"
              value={
                way[direction]?.to.city
                  ? stationTo?.rus
                    ? `${cityTo?.rus}: ${stationTo?.rus}`
                    : `${cityTo?.rus}`
                  : ""
              }
              selected={way[direction]?.to}
              onClick={(city, station) => handleStationChange(city, station, "to")}
              placeholder="Станция прибытия"
              message={message.to}
              border={false}
              options={cities}
            />
          </InputGroup>

          <Stacks justifyContent="space-between">
            <Typography
              cursor="pointer"
              onClick={handleTodayClick}
              variant="h3"
              color="default-white"
            >
              Сегодня
            </Typography>
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
          <Button onClick={handleClick} loading={isFetching} label={changeButtonText()} />
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
